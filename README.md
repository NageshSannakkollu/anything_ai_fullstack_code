## 🚀 Tech Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: create-react-app 
- **Styling**:  CSS style sheet
- **State Management**: useState Management
- **Routing**: React Router DOM v6
- **Form Handling**: React Hook Form 

### Backend 
- **Database**: SQLite
- **Authentication**: JWT-based auth with localstorage management
- **Security**: Row Level Security (RLS) policies
- **API**: RESTful endpoints

## 📦 Dependencies

### Core Dependencies
```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-router-dom": "^6.30.1",
}

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ and npm installed
- Git installed

### Step 1: Clone the Repository

git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>


### Step 2: Install Dependencies

npm install

### Step 4: Start Development Server

The app will be available at `http://localhost:3000`


## 🔐 Authentication & Authorization

### User Roles
- **User**: Can create, read, update, and delete their own tasks
- **Admin**: Full access to all tasks and user management

#### `user_roles`
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| user_id | PRIMARY KEY | AUTO INCREMENT | References auth.users |
| email | EMAIL | 
| password | PASSWORD |
| role | user_role | Either 'admin' or 'user' |

#### `tasks`
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| title | TEXT | Task title |
| description | TEXT | Task description |
| created_by | UUID | References auth.users |
| created_at | TIMESTAMP | Creation timestamp |

### Security Features
- JWT-based session management
- Password hashing with bcrypt
- Row Level Security (RLS) on all tables
- Protected routes with role-based access


### Making a User Admin
To promote a user to admin, run this SQL in the Lovable Cloud SQL editor:
```sql
UPDATE user
SET role = 'admin' 
WHERE user_id = 'USER_ID_HERE';

### RLS Policies
- Users can only view/edit their own tasks
- Admins can view/edit and delete all tasks
- Users can only view their own profile
- Admins can view all profiles and manage roles

## 🧪 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | api/v1/auth/signup | Register new user |
| POST | api/v1/auth/signin | Login user |


### Tasks (Protected)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | api/v1/tasks | Get all tasks (filtered by role) |
| POST | api/v1/tasks | Create new task |
| PATCH | api/v1/tasks/update/:id | Update task |
| DELETE | api/v1/tasks/delete/:id | Delete task |

### Admin (Admin Only)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /profiles | Get all users |
| PATCH | /user_roles/:id | Update user role |

