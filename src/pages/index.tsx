import PlanilhaData from '@/components/PlanilhaData'
import SearchAppBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import React, { useEffect } from 'react';

export default function Db() {

  useEffect(() => {
    document.title = 'Return to Morroc - Database'; // Defina o título desejado aqui
  }, []);

  return (
    <>
      <SearchAppBar />
      

      <main>
        <div className="coisos" style={{ margin: '30px' }}>
          <PlanilhaData />
        </div>
        
      </main>
      
    </>
  )
}
