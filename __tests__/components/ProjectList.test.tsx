import { render, screen } from '../utils/test-utils'
import ProjectList from '@/app/components/ProjectList'
import { Project, Task, User } from '@prisma/client'

const mockProjects: (Project & { tasks: Task[]; users: User[] })[] = [
  {
    id: '1',
    name: 'Test Project',
    description: 'Test Description',
    createdAt: new Date(),
    updatedAt: new Date(),
    tasks: [],
    users: [],
  },
]

describe('ProjectList', () => {
  it('renders projects correctly', () => {
    render(<ProjectList projects={mockProjects} />)
    
    expect(screen.getByText('Test Project')).toBeInTheDocument()
    expect(screen.getByText('Test Description')).toBeInTheDocument()
    expect(screen.getByText('0 tasks')).toBeInTheDocument()
    expect(screen.getByText('0 users')).toBeInTheDocument()
  })

  it('renders empty state when no projects', () => {
    render(<ProjectList projects={[]} />)
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
  })
}) 