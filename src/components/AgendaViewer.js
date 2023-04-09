'use client';

import AgendaDisplay from '@/components/AgendaDisplay';
import Navigator from '@/components/Navigator';
import { useState } from 'react';

export default function AgendaViewer({ agencies, agendas }) {
  const [selectedAgency, setSelectedAgency] = useState(agencies[0]);
  const [selectedAgenda, setSelectedAgenda] = useState(agendas[0]);

  return (
    <section className='grid gap-3 m-3 lg:grid-cols-2'>
      <Navigator
        agencies={agencies}
        agendas={agendas}
        selectedAgency={selectedAgency}
        selectedAgenda={selectedAgenda}
        setSelectedAgency={setSelectedAgency}
        setSelectedAgenda={setSelectedAgenda}
      />
      <AgendaDisplay agenda={selectedAgenda} />
    </section>
  );
}
