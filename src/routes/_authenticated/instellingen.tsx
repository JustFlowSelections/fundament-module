import { createFileRoute } from "@tanstack/react-router";
import { InstellingenPage } from "@/core/components/layout/InstellingenPage";

export const Route = createFileRoute("/_authenticated/instellingen")({
  component: () => <InstellingenPage modules={[]} />,
});