'use client';

import { agendas, agencies } from '@/utils/data';
import { useState } from 'react';

export default function Page() {
  return <AgendaViewer agencies={agencies} agendas={agendas} />;
}

function AgendaViewer({ agencies, agendas }) {
  const [selectedAgency, setSelectedAgency] = useState();
  const [selectedAgenda, setSelectedAgenda] = useState();

  return (
    <>
      <section className='grid sm:grid-cols-2 gap-2 m-5'>
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
      </section>
      <section>
        <AgendaDisplay agency={selectedAgency} agenda={selectedAgenda} />
      </section>
    </>
  );
}

function AgencyList({ agencies, selectedAgency, setSelectedAgency }) {
  const items = agencies.map((agency) => (
    <li
      key={agency.id}
      className={`block mt-2 first:mt-0 p-5 rounded-lg cursor-pointer ${
        selectedAgency === agency
          ? 'bg-blue-700 hover:bg-blue-700/95 text-slate-50 dark:bg-blue-800 dark:hover:bg-blue-800/90'
          : 'hover:bg-slate-300/50 dark:hover:bg-slate-800'
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
      className={`block mt-2 first:mt-0 p-5 rounded-lg cursor-pointer font-medium ${
        selectedAgenda === agenda
          ? 'bg-blue-700 hover:bg-blue-700/95 text-slate-50 dark:bg-blue-800 dark:hover:bg-blue-800/90'
          : 'hover:bg-slate-300/50 dark:hover:bg-slate-800'
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
      <section className='m-5 p-5 bg-slate-50 dark:bg-slate-800 rounded-lg'>
        <h1 className='text-3xl font-semibold mt-5 mb-10'>
          {FormatDate(agenda.date)} - {agenda.title}
        </h1>
        <p className='whitespace-pre-line text-justify max-w-prose'>
          {agenda.content}
        </p>
      </section>
    );
  } else {
    return null;
  }
}

function FormatDate(date, format) {
  return new Date(date).toLocaleDateString('en-us', {
    dateStyle: format || 'long',
  });
}
