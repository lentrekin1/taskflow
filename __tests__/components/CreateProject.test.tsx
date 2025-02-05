import { render, screen, fireEvent, waitFor } from '../utils/test-utils'
import CreateProject from '@/app/components/CreateProject'
import { createProjectAction } from '@/app/actions/projects'

// Mock the server action
jest.mock('@/app/actions/projects', () => ({
  createProjectAction: jest.fn(),
}))

describe('CreateProject', () => {
  beforeEach(() => {
    (createProjectAction as jest.Mock).mockClear()
  })

  it('opens modal on button click', () => {
    render(<CreateProject />)
    
    fireEvent.click(screen.getByText('New Project'))
    expect(screen.getByText('Create New Project')).toBeInTheDocument()
  })

  it('submits form with correct data', async () => {
    (createProjectAction as jest.Mock).mockResolvedValueOnce({ success: true })
    
    render(<CreateProject />)
    
    fireEvent.click(screen.getByText('New Project'))
    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: 'Test Project' },
    })
    fireEvent.change(screen.getByLabelText('Description'), {
      target: { value: 'Test Description' },
    })
    
    fireEvent.click(screen.getByText('Create Project'))
    
    await waitFor(() => {
      expect(createProjectAction).toHaveBeenCalledWith(expect.any(FormData))
    })
  })

  it('shows error message on failure', async () => {
    (createProjectAction as jest.Mock).mockResolvedValueOnce({
      success: false,
      error: 'Error creating project',
    })
    
    render(<CreateProject />)
    
    // Open modal
    fireEvent.click(screen.getByText('New Project'))
    
    // Submit empty form to trigger error
    fireEvent.submit(screen.getByRole('form'))
    
    await waitFor(() => {
      expect(screen.getByText(/Error creating project/i)).toBeInTheDocument()
    })
  })
}) 