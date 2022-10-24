import { 
  ChakraProvider,
  Tabs, 
  TabList, 
  TabPanels, 
  Tab, 
  TabPanel,
  Popover as ChakraPopover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { NavBar } from './components/NavBar/NavBar'
import { PageHeader } from './components/PageHeader/PageHeader'
import { BenchmarkTab } from './components/BenchmarkTab/BenchmarkTab'
import './App.css'

const App = () => {
  return (
    <ChakraProvider>
      <div>
        <NavBar />
        <PageHeader />
        <Tabs>
          <div className='flex justify-between items-center bg-dark-blue px-5 lg:px-12 overflow-y-auto space-x-5'>
            <TabList>
              <Tab>Overview</Tab>
              <Tab>Assets</Tab>
              <Tab>Projection</Tab>
              <Tab>Benchmark</Tab>
            </TabList>
            <ChakraPopover>
              <PopoverTrigger>
                <button className='flex items-center text-white space-x-2'>
                  <div className='flex-shrink-0'>More actions</div>
                  <ChevronDownIcon />
                </button>
              </PopoverTrigger>
              <PopoverContent>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverBody>More actions here</PopoverBody>
              </PopoverContent>
            </ChakraPopover>
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
