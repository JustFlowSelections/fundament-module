import type { FlowModule, SettingsCard } from "../../types/module";
import { Header } from "./Header";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { supabase } from "../../supabase/client";
import { toast } from "sonner";
import { Loader2, User } from "lucide-react";
import { NotificationSettingsCard } from "../instellingen/NotificationSettingsCard";

// ─── Profile Card ─────────────────────────────────────────────────────────────

function ProfileCard() {
  const [displayName, setDisplayName] = useState("");
  const [saving, setSaving] = useState(false);

  const handleUpdateProfile = async () => {
    setSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Niet ingelogd");
      const { error } = await supabase.from("profiles").update({ display_name: displayName.trim() }).eq("id", user.id);
      if (error) throw error;
      toast.success("Profiel bijgewerkt");
    } catch {
      toast.error("Fout bij het bijwerken van profiel");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <User className="h-5 w-5 text-primary" />
          <CardTitle>Profielgegevens</CardTitle>
        </div>
        <CardDescription>Werk je persoonlijke gegevens bij</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="displayName">Weergavenaam</Label>
          <Input
            id="displayName"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            maxLength={100}
            placeholder="Je naam"
          />
        </div>
        <Button onClick={handleUpdateProfile} disabled={saving}>
          {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Opslaan
        </Button>
      </CardContent>
    </Card>
  );
}

// ─── Password Card ────────────────────────────────────────────────────────────

function PasswordCard() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changingPassword, setChangingPassword] = useState(false);

  const handleChangePassword = async () => {
    if (newPassword.length < 6) { toast.error("Wachtwoord moet minimaal 6 tekens bevatten"); return; }
    if (newPassword !== confirmPassword) { toast.error("Wachtwoorden komen niet overeen"); return; }
    setChangingPassword(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;
      toast.success("Wachtwoord bijgewerkt");
      setNewPassword("");
      setConfirmPassword("");
    } catch {
      toast.error("Fout bij het wijzigen van wachtwoord");
    } finally {
      setChangingPassword(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Wachtwoord wijzigen</CardTitle>
        <CardDescription>Kies een nieuw wachtwoord</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="newPassword">Nieuw wachtwoord</Label>
          <Input
            id="newPassword"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            maxLength={128}
            placeholder="••••••••"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Bevestig wachtwoord</Label>
          <Input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            maxLength={128}
            placeholder="••••••••"
          />
        </div>
        <Button onClick={handleChangePassword} disabled={changingPassword}>
          {changingPassword && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Wachtwoord wijzigen
        </Button>
      </CardContent>
    </Card>
  );
}

// ─── Core cards registry ──────────────────────────────────────────────────────

const coreCards: SettingsCard[] = [
  { component: ProfileCard, order: 0 },
  { component: PasswordCard, order: 1 },
  { component: NotificationSettingsCard, order: 2 },
];

// ─── Main export ──────────────────────────────────────────────────────────────

export function InstellingenPage({ modules }: { modules: FlowModule[] }) {
  const moduleCards = modules.flatMap((m) => m.settingsCards);
  const allCards = [...coreCards, ...moduleCards].sort((a, b) => a.order - b.order);

  return (
    <>
      <Header title="Instellingen" />
      <main className="p-6">
        <div className="grid gap-6 lg:grid-cols-2">
          {allCards.map((card, i) => <card.component key={i} />)}
        </div>
      </main>
    </>
  );
}
