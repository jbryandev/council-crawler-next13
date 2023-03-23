'use client';

import { agendas, agencies } from '@/utils/data';
import { useState } from 'react';

const styles = {
  active:
    'bg-blue-700 hover:bg-blue-700/95 dark:bg-blue-800 dark:hover:bg-blue-800/90 text-slate-50',
  inactive: 'hover:bg-slate-300 dark:hover:bg-slate-800',
};

function FormatDate(date, format) {
  return new Date(date).toLocaleDateString('en-us', {
    dateStyle: format || 'long',
  });
}

export default function Page() {
  return <AgendaViewer agencies={agencies} agendas={agendas} />;
}

function AgendaViewer({ agencies, agendas }) {
  const [selectedAgency, setSelectedAgency] = useState(agencies[0]);
  const [selectedAgenda, setSelectedAgenda] = useState(agendas[0]);

  return (
    <>
      <header className='flex gap-3 xl:hidden m-3 items-center'>
        <NavMenu
          agencies={agencies}
          selectedAgency={selectedAgency}
          setSelectedAgency={setSelectedAgency}
        />
        <h1 className={`px-5 font-medium`}>{selectedAgency.name}</h1>
      </header>
      <section className='grid gap-3 m-3 xl:grid-cols-2'>
        <menu className='hidden xl:grid xl:grid-cols-2 gap-3'>
          <AgencyList
            agencies={agencies}
            selectedAgency={selectedAgency}
            setSelectedAgency={setSelectedAgency}
          />
          <AgendaList
            agency={selectedAgency}
            agendas={agendas}
            selectedAgenda={selectedAgenda}
            setSelectedAgenda={setSelectedAgenda}
          />
        </menu>
        <AgendaDisplay agency={selectedAgency} agenda={selectedAgenda} />
      </section>
    </>
  );
}

function NavMenu({ agencies, selectedAgency, setSelectedAgency }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <menu
        className={`z-10 p-5 rounded-lg cursor-pointer font-medium ${
          open ? styles.inactive : styles.active
        }`}
        onClick={() => setOpen(!open)}
      >
        Menu
      </menu>
      <div
        className={`bg-slate-50 dark:bg-slate-900 ${
          open ? 'flex' : 'hidden'
        } absolute top-[74px] left-0 p-3 rounded-lg font-medium bg-slate-50`}
      >
        <AgencyList
          agencies={agencies}
          selectedAgency={selectedAgency}
          setSelectedAgency={setSelectedAgency}
        />
      </div>
    </>
  );
}

function AgencyList({ agencies, selectedAgency, setSelectedAgency }) {
  const items = agencies.map((agency) => (
    <li
      key={agency.id}
      className={`block mt-3 first:mt-0 p-5 rounded-lg cursor-pointer font-medium  ${
        selectedAgency === agency ? styles.active : styles.inactive
      }`}
      onClick={() => {
        setSelectedAgency(agency);
      }}
    >
      {agency.name}
    </li>
  ));
  return <ul>{items}</ul>;
}

function AgendaList({ agency, agendas, selectedAgenda, setSelectedAgenda }) {
  const filteredAgendas = agendas.filter(
    (agenda) => agenda.agency === agency?.id
  );

  const items = filteredAgendas.map((agenda) => (
    <li
      key={agenda.id}
      className={`block mt-3 first:mt-0 p-5 rounded-lg cursor-pointer font-medium ${
        selectedAgenda === agenda ? styles.active : styles.inactive
      } `}
      onClick={() => {
        setSelectedAgenda(agenda);
      }}
    >
      {FormatDate(agenda.date, 'short')} - {agenda.title}
    </li>
  ));
  return <ul>{items}</ul>;
}

function AgendaDisplay({ agenda }) {
  if (agenda) {
    return (
      <div className='p-5 bg-slate-50 dark:bg-slate-800 rounded-lg'>
        <h2 className='text-3xl font-semibold mt-5 mb-10'>
          {FormatDate(agenda.date)} - {agenda.title}
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
