import { render, screen, fireEvent } from '../utils/test-utils'
import TaskList from '@/app/components/TaskList'
import { Task } from '@prisma/client'
import { updateTaskStatusAction } from '@/app/actions/tasks'

jest.mock('@/app/actions/tasks', () => ({
  updateTaskStatusAction: jest.fn(),
}))

const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Test Task',
    description: 'Test Description',
    status: 'TODO',
    dueDate: new Date(),
    projectId: '1',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

describe('TaskList', () => {
  beforeEach(() => {
    (updateTaskStatusAction as jest.Mock).mockClear()
  })

  it('renders tasks correctly', () => {
    render(<TaskList tasks={mockTasks} projectId="1" />)
    
    expect(screen.getByText('Test Task')).toBeInTheDocument()
    expect(screen.getByText('Test Description')).toBeInTheDocument()
  })

  it('filters tasks correctly', () => {
    render(<TaskList tasks={mockTasks} projectId="1" />)
    
    fireEvent.click(screen.getByText('DONE'))
    expect(screen.queryByText('Test Task')).not.toBeInTheDocument()
    
    fireEvent.click(screen.getByText('TODO'))
    expect(screen.getByText('Test Task')).toBeInTheDocument()
  })

  it('updates task status', async () => {
    (updateTaskStatusAction as jest.Mock).mockResolvedValueOnce({})
    
    render(<TaskList tasks={mockTasks} projectId="1" />)
    
    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'DONE' },
    })
    
    expect(updateTaskStatusAction).toHaveBeenCalledWith('1', 'DONE')
  })
}) 