import { useState } from 'react';
import { motion } from 'framer-motion';
import { agencies, agendas } from '@/utils/data';
import { useSelectedLayoutSegments } from 'next/navigation';
import AgencyMenu from './AgencyMenu';
import AgendaMenu from './AgendaMenu';

export default function Menu({ setMenuOpen }) {
  const [activeMenu, setActiveMenu] = useState('agency');
  const [selectedAgency, setSelectedAgency] = useState(null);
  const activeAgendaId = Number(useSelectedLayoutSegments()[1]);
  const activeAgenda = agendas.find((agenda) => agenda.id === activeAgendaId);
  const activeAgency = agencies.find(
    (agency) => agency.id === activeAgenda?.agencyId
  );

  return (
    <>
      {activeMenu === 'agency' && (
        <motion.div
          initial={{ x: '-110%' }}
          animate={{ x: '0%' }}
          exit={{ x: '-110%' }}
          transition={{ duration: 0.2 }}
        >
          <AgencyMenu
            activeAgency={activeAgency}
            setSelectedAgency={setSelectedAgency}
            onClick={() => setActiveMenu('agenda')}
          />
        </motion.div>
      )}
      {activeMenu === 'agenda' && (
        <motion.div
          initial={{ x: '110%' }}
          animate={{ x: '0%' }}
          exit={{ x: '110% ' }}
          transition={{ duration: 0.2 }}
        >
          <AgendaMenu
            agency={selectedAgency}
            agendas={agendas.filter(
              (agenda) => agenda.agencyId === selectedAgency.id
            )}
            activeAgenda={activeAgenda}
            onAgencyClick={() => setActiveMenu('agency')}
            onAgendaClick={() => setMenuOpen && setMenuOpen(false)}
          />
        </motion.div>
      )}
    </>
  );
}
