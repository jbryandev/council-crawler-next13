'use client';

import ListItem from '@/components/ListItem';
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
      <button
        className={`xl:hidden z-10 p-5 rounded-lg cursor-pointer font-medium ${
          open
            ? 'hover:bg-slate-300 dark:hover:bg-slate-800'
            : 'bg-blue-700 hover:bg-blue-700/95 dark:bg-blue-800 dark:hover:bg-blue-800/90 text-slate-50'
        }`}
        onClick={() => setOpen(!open)}
      >
        Menu
      </button>
      <menu
        name='agency-menu'
        className={`${
          // bug here with menu sticking if window is resized while open
          open && activeMenu === 'agency'
            ? 'flex absolute top-16 p-3 mt-3 rounded-lg border-solid border-2 border-slate-400 dark:border-slate-700 font-medium bg-slate-200 dark:bg-slate-900'
            : 'hidden xl:grid gap-3'
        }`}
      >
        <AgencyList
          agencies={agencies}
          selectedAgency={selectedAgency}
          setSelectedAgency={setSelectedAgency}
          setActiveMenu={setActiveMenu}
        />
      </menu>
      <menu
        name='agenda-menu'
        className={`${
          open && activeMenu === 'agenda'
            ? 'flex flex-col absolute top-16 p-3 mt-3 rounded-lg border-solid border-2 border-slate-400 dark:border-slate-700 font-medium bg-slate-200 dark:bg-slate-900'
            : 'hidden xl:grid gap-3'
        }`}
      >
        <button
          className='xl:hidden block my-3 first:mt-0 p-5 rounded-lg cursor-pointer font-medium hover:bg-slate-300 dark:hover:bg-slate-800'
          onClick={() => {
            setActiveMenu('agency');
          }}
        >
          {selectedAgency.name}
        </button>
        <AgendaList
          agency={selectedAgency}
          agendas={agendas}
          selectedAgenda={selectedAgenda}
          setSelectedAgenda={setSelectedAgenda}
        />
      </menu>
      <article className='xl:col-span-2'>
        <AgendaDisplay agency={selectedAgency} agenda={selectedAgenda} />
      </article>
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
