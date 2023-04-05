'use client';

import AgendaViewer from '@/components/AgendaViewer';
import Navigator from '@/components/Navigator';
import { agendas, agencies } from '@/utils/data';
import { useState } from 'react';

export default function Page() {
  const [selectedAgency, setSelectedAgency] = useState(agencies[0]);
  const [selectedAgenda, setSelectedAgenda] = useState(agendas[0]);

  return (
    <section className='grid gap-3 m-3 xl:grid-cols-2'>
      <Navigator
        agencies={agencies}
        agendas={agendas}
        selectedAgency={selectedAgency}
        selectedAgenda={selectedAgenda}
        setSelectedAgency={setSelectedAgency}
        setSelectedAgenda={setSelectedAgenda}
      />
      <AgendaViewer agenda={selectedAgenda} />
    </section>
  );
}
