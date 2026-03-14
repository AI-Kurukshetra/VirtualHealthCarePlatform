import { Card } from '@/components/ui/card';

export default function RecordList({ records = [] }) {
  if (!records.length) {
    return <Card>No medical records available.</Card>;
  }

  return (
    <div className='space-y-3'>
      {records.map((record) => (
        <Card key={record.id}>
          <p className='font-semibold capitalize'>{record.record_type}</p>
          <p className='mt-1 text-sm text-slate-600'>{record.summary}</p>
        </Card>
      ))}
    </div>
  );
}
