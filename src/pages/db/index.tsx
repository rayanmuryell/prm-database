import PlanilhaData from '@/components/PlanilhaData'
import SearchAppBar from '@/components/NavBar'

export default function Db() {
  return (
    <>
    <SearchAppBar />
    
    <main>
        <div className="coisos" style={{margin: '30px'}}>
      <PlanilhaData />
    </div>
    </main>
    </>
  )
}
