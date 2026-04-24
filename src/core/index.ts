// Auth
export { useAuthState } from "./auth/useAuth";
export type { AuthContext, AuthState, AuthActions, AppRole } from "./auth/useAuth";

// Supabase
export { supabase } from "./supabase/client";
export type { Database } from "./supabase/types";

// Layout
export { Header } from "./components/layout/Header";
export { InstellingenPage } from "./components/layout/InstellingenPage";
export { Sidebar } from "./components/layout/Sidebar";

// UI components
export { Button } from "./components/ui/button";
export { Input } from "./components/ui/input";
export { Label } from "./components/ui/label";
export { Textarea } from "./components/ui/textarea";
export { Switch } from "./components/ui/switch";
export { Badge } from "./components/ui/badge";
export { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card";
export {
  Dialog, DialogContent, DialogHeader, DialogTitle,
  DialogTrigger, DialogFooter, DialogClose,
} from "./components/ui/dialog";
export {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader,
  AlertDialogTitle, AlertDialogTrigger,
} from "./components/ui/alert-dialog";
export {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "./components/ui/table";
export {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "./components/ui/select";
export { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
export { Popover, PopoverContent, PopoverTrigger } from "./components/ui/popover";
export { Checkbox } from "./components/ui/checkbox";
export { Separator } from "./components/ui/separator";
export { Skeleton } from "./components/ui/skeleton";
export { toast } from "sonner";

// Utilities
export { cn } from "./lib/utils";
export { validateFileUpload, ALLOWED_FILE_TYPES } from "./lib/validationSchemas";
export { useIsMobile } from "./hooks/use-mobile";

// Module contract types
export type { FlowModule, NavItem, SettingsCard } from "./types/module";