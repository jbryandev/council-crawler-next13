'use client';

import { agendas, agencies } from '@/utils/data';
import { useState } from 'react';

export default function Page() {
  return <AgendaViewer agencies={agencies} agendas={agendas} />;
}

function AgendaViewer({ agencies, agendas }) {
  const [selectedAgency, setSelectedAgency] = useState(agencies[0]);
  const [selectedAgenda, setSelectedAgenda] = useState(agendas[0]);
  const [activeMenu, setActiveMenu] = useState('agency');

  return (
    <>
      <MobileNav
        agencies={agencies}
        agendas={agendas}
        selectedAgency={selectedAgency}
        setSelectedAgency={setSelectedAgency}
        selectedAgenda={selectedAgenda}
        setSelectedAgenda={setSelectedAgenda}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
      />

      <section className='grid gap-3 m-3 xl:grid-cols-2'>
        <menu className='hidden xl:grid xl:grid-cols-2 gap-3'>
          <AgencyList
            agencies={agencies}
            selectedAgency={selectedAgency}
            setSelectedAgency={setSelectedAgency}
            setActiveMenu={setActiveMenu}
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

function MobileNav({
  agencies,
  agendas,
  selectedAgency,
  setSelectedAgency,
  selectedAgenda,
  setSelectedAgenda,
  activeMenu,
  setActiveMenu,
}) {
  const [open, setOpen] = useState(false);

  return (
    <nav className='xl:hidden flex gap-3 m-3 items-center'>
      <button
        className={`z-10 p-5 rounded-lg cursor-pointer font-medium ${
          open
            ? 'hover:bg-slate-300 dark:hover:bg-slate-800'
            : 'bg-blue-700 hover:bg-blue-700/95 dark:bg-blue-800 dark:hover:bg-blue-800/90 text-slate-50'
        }`}
        onClick={() => setOpen(!open)}
      >
        Menu
      </button>

      <h1 className='px-5 font-medium'>{selectedAgency.name}</h1>

      <menu
        name='agency'
        className={`${
          open && activeMenu === 'agency' ? 'flex' : 'hidden'
        } absolute top-16 p-3 mt-3 rounded-lg border-solid border-2 border-slate-400 dark:border-slate-700 font-medium bg-slate-200 dark:bg-slate-900 `}
      >
        <AgencyList
          agencies={agencies}
          selectedAgency={selectedAgency}
          setSelectedAgency={setSelectedAgency}
          setActiveMenu={setActiveMenu}
        />
      </menu>

      <menu
        name='agenda'
        className={`${
          open && activeMenu === 'agenda' ? 'flex flex-col' : 'hidden'
        } absolute top-16 p-3 mt-3 rounded-lg border-solid border-2 border-slate-400 dark:border-slate-700 font-medium bg-slate-200 dark:bg-slate-900 `}
      >
        <button
          className='block my-3 first:mt-0 p-5 rounded-lg cursor-pointer font-medium hover:bg-slate-300 dark:hover:bg-slate-800'
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
    </nav>
  );
}

function AgencyList({
  agencies,
  selectedAgency,
  setSelectedAgency,
  setActiveMenu,
}) {
  const items = agencies.map((agency) => (
    <li
      key={agency.id}
      className={`block mt-3 first:mt-0 p-5 rounded-lg cursor-pointer font-medium  ${
        selectedAgency === agency
          ? 'bg-blue-700 hover:bg-blue-700/95 dark:bg-blue-800 dark:hover:bg-blue-800/90 text-slate-50'
          : 'hover:bg-slate-300 dark:hover:bg-slate-800'
      }`}
      onClick={() => {
        setSelectedAgency(agency);
        setActiveMenu('agenda');
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
        selectedAgenda === agenda
          ? 'bg-blue-700 hover:bg-blue-700/95 dark:bg-blue-800 dark:hover:bg-blue-800/90 text-slate-50'
          : 'hover:bg-slate-300 dark:hover:bg-slate-800'
      } `}
      onClick={() => setSelectedAgenda(agenda)}
    >
      {new Date(agenda.date).toLocaleDateString('en-us', {
        dateStyle: 'long',
      })}
    </li>
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
