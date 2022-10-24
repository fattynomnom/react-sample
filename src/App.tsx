import { 
  ChakraProvider,
  Tabs, 
  TabList, 
  TabPanels, 
  Tab, 
  TabPanel 
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { NavBar } from './components/NavBar/NavBar'
import { PageHeader } from './components/PageHeader/PageHeader'
import { Popover } from './components/Popover/Popover'
import { BenchmarkTab } from './components/BenchmarkTab/BenchmarkTab'
import './App.css'

const App = () => {
  return (
    <ChakraProvider>
      <div>
        <NavBar />
        <PageHeader />
        <Tabs>
          <div className='flex justify-between items-center bg-blue-900 px-12'>
            <TabList>
              <Tab>Overview</Tab>
              <Tab>Assets</Tab>
              <Tab>Projection</Tab>
              <Tab>Benchmark</Tab>
            </TabList>
            <Popover>
              <button className='flex items-center text-white space-x-2'>
                <span>More actions</span>
                <ChevronDownIcon />
              </button>
            </Popover>
          </div>
          <TabPanels>
            <TabPanel>
              <BenchmarkTab />
            </TabPanel>
            <TabPanel>
              <p>Assets</p>
            </TabPanel>
            <TabPanel>
              <p>Projection</p>
            </TabPanel>
            <TabPanel>
              <p>Benchmark</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </ChakraProvider>
  )
}

export default App;
