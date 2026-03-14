import AppShell from '@/components/layout/app-shell';
import { Card, CardDescription, CardTitle } from '@/components/ui/card';

export default function ConsultationsPage() {
  return (
    <AppShell title='Video Consultations' subtitle='WebRTC/Twilio based telehealth session management.'>
      <Card>
        <CardTitle>Consultation Session Architecture</CardTitle>
        <CardDescription>
          Room token issuance, participant controls, and optional recording are exposed through modular services. Socket.io
          support is included for real-time signaling workflows.
        </CardDescription>
      </Card>
    </AppShell>
  );
}
