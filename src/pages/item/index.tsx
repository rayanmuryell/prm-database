import PlanilhaData from '@/components/PlanilhaData'
import SearchAppBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import React, { useEffect } from 'react';
import PlanilhaData_Item from '@/components/PlanilhaData_Item';

export default function Db() {

  useEffect(() => {
    document.title = 'Return to Morroc - Database'; // Defina o título desejado aqui
  }, []);

  return (
    <>
      <SearchAppBar />
      

      <main>
        <div className="coisos" style={{ margin: '30px' }}>
          <PlanilhaData_Item />
        </div>
        
      </main>
      
    </>
  )
}
