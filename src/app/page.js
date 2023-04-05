'use client';

import Button from '@/components/Button';
import ListItem from '@/components/ListItem';
import Menu from '@/components/Menu';
import { agendas, agencies } from '@/utils/data';
import { useState } from 'react';

export default function Page() {
  return <AgendaViewer agencies={agencies} agendas={agendas} />;
}

function AgendaViewer({ agencies, agendas }) {
  const [selectedAgency, setSelectedAgency] = useState(agencies[0]);
  const [selectedAgenda, setSelectedAgenda] = useState(agendas[0]);
  const [activeMenu, setActiveMenu] = useState('agency');
  const [open, setOpen] = useState(false);

  return (
    <section className='grid gap-3 m-3 xl:grid-cols-4'>
      <Button
        styles='xl:hidden z-10'
        active={!open}
        onClick={() => setOpen(!open)}
      >
        Menu
      </Button>
      <Menu open={open} active={activeMenu === 'agency'}>
        <AgencyList
          agencies={agencies}
          selectedAgency={selectedAgency}
          setSelectedAgency={setSelectedAgency}
          setActiveMenu={setActiveMenu}
        />
      </Menu>
      <Menu open={open} active={activeMenu === 'agenda'}>
        <Button
          styles='xl:hidden block my-3 first:mt-0'
          onClick={() => {
            setActiveMenu('agency');
          }}
        >
          {selectedAgency.name}
        </Button>
        <AgendaList
          agency={selectedAgency}
          agendas={agendas}
          selectedAgenda={selectedAgenda}
          setSelectedAgenda={setSelectedAgenda}
        />
      </Menu>
      <main className='xl:col-span-2'>
        <AgendaDisplay agency={selectedAgency} agenda={selectedAgenda} />
      </main>
    </section>
  );
}

function AgencyList({
  agencies,
  selectedAgency,
  setSelectedAgency,
  setActiveMenu,
}) {
  const items = agencies.map((agency) => (
    <ListItem
      key={agency.id}
      active={selectedAgency === agency}
      onClick={() => {
        setSelectedAgency(agency);
        setActiveMenu('agenda');
      }}
    >
      {agency.name}
    </ListItem>
  ));
  return <ul>{items}</ul>;
}

function AgendaList({ agency, agendas, selectedAgenda, setSelectedAgenda }) {
  const filteredAgendas = agendas.filter(
    (agenda) => agenda.agency === agency?.id
  );

  const items = filteredAgendas.map((agenda) => (
    <ListItem
      key={agenda.id}
      active={selectedAgenda === agenda}
      onClick={() => setSelectedAgenda(agenda)}
    >
      {new Date(agenda.date).toLocaleDateString('en-us', {
        dateStyle: 'long',
      })}
    </ListItem>
  ));
  return <ul>{items}</ul>;
}

function AgendaDisplay({ agenda }) {
  if (agenda) {
    return (
      <div className='p-5 bg-slate-50 dark:bg-slate-800 rounded-lg'>
        <h2 className='text-3xl font-semibold mt-5 mb-10'>
          {new Date(agenda.date).toLocaleDateString('en-us', {
            dateStyle: 'long',
          })}
        </h2>

        <p className='whitespace-pre-line text-justify max-w-prose'>
          {agenda.content}
        </p>
      </div>
    );
  } else {
    return null;
  }
}
