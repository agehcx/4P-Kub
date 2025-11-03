import { createContext, useContext, useState } from 'react'

const WorkflowContext = createContext()

export function WorkflowProvider({ children }) {
  const [workflowState, setWorkflowState] = useState({
    hasGeneratedShortlist: false,
    shortlistData: null,
    searchParams: null
  })

  const setShortlistGenerated = (data, searchParams) => {
    setWorkflowState({
      hasGeneratedShortlist: true,
      shortlistData: data,
      searchParams: searchParams
    })
  }

  const resetWorkflow = () => {
    setWorkflowState({
      hasGeneratedShortlist: false,
      shortlistData: null,
      searchParams: null
    })
  }

  return (
    <WorkflowContext.Provider value={{
      ...workflowState,
      setShortlistGenerated,
      resetWorkflow
    }}>
      {children}
    </WorkflowContext.Provider>
  )
}

export function useWorkflow() {
  const context = useContext(WorkflowContext)
  if (!context) {
    throw new Error('useWorkflow must be used within a WorkflowProvider')
  }
  return context
}
