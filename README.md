# FormCrafter ✨

FormCrafter is a simple, user-friendly form creation platform that allows authenticated users to create, manage, and view forms. It provides an interface to log in, access the dashboard, and perform form-related tasks.

## Features 🛠️

- **Login** 🔑: Allows users to authenticate and access their dashboard.
- **Dashboard** 📊: After logging in, users are redirected to a dashboard where they can:
  - View a list of forms.
  - Create new forms.
- **Create Form** ✍️: Users can create new forms via an easy-to-use form builder interface.
- **List Forms** 📋: Users can view a list of their previously created forms.
- **View Forms** 👀: Users can view and use their previously created forms.
- **Logout** 🚪: Users can log out of the platform from the header.

## Getting Started 🚀

### Prerequisites ⚙️

To run this project locally, ensure you have the following installed:

- **Node.js** (version >= 14)
- **npm** (or **yarn**)
- A modern browser (e.g., Chrome, Firefox)

### Installing 

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/formcrafter.git
   cd formcrafter
   ```

2. Install dependencies:

   Using npm:
   ```bash
   npm install
   ```

   Or using yarn:
   ```bash
   yarn install
   ```

### Running the App 

1. Start the development server:

   Using npm:
   ```bash
   npm start
   ```

   Or using yarn:
   ```bash
   yarn start
   ```

2. Navigate to `http://localhost:5173` in your browser to access the app.

### Folder Structure 🗂️

```
/src
│
├── /components        # Reusable components (Input, Button, Header, etc.)
├── /features          # Redux slices for state management (authSlice.js etc.)
├── /pages             # Pages for different routes (LoginPage, Dashboard, CreateFormPage, FormsListPage, ViewFormPage)
├── /utils             # Utility functions (for API calls for future use)
└── /App.js            # Main component that sets up routes and layout
```

### Key Files 📃

- **App.jsx**: Sets up routing and main layout (includes the header, footer, and page content).
- **authSlice.js**: Redux slice that handles authentication (login/logout).
- **formsSlice.js** :  Redux slice that handles forms (fetching/adding).
- **Header.jsx**: Displays navigation options (e.g., Dashboard, Create Form) and the logout button.
- **LoginPage.jsx**: Handles user authentication and login form.
- **Dashboard.jsx**: Displays the user's dashboard, including form links and options to create/view forms.
- **CreateFormPage.jsx**: Allows the user to create a new form.
- **FormsListPage.jsx**: Allows the user to view list of their previously created forms.
- **ViewFormPage.jsx**: Allows the user to view and use their previously created form.

## API Integration (Future Scope, Frontend is done) 

### Authentication 🔐

- **Login**: On form submission, a backend API call should be made to authenticate the user. If successful, the user will be redirected to the dashboard, and the login state will be stored in Redux and `localStorage`.
- **Logout**: Logging out will clear the Redux state and remove the login details from `localStorage`.

### Form Management 📝

- **Create Form**: Users can create a form by providing form details, which will be stored in the local storage (since it is frontend focused for now).
- **View Forms**: Users can view a list of forms they’ve created and use those forms.

## Technologies Used👩🏻‍💻

- **React** ⚛️: A JavaScript library for building user interfaces.
- **React Router** : For routing and navigation between pages.
- **Redux Toolkit** : For managing global state (e.g., authentication state).
- **React Hook Form** : For handling form validation and submission.
- **Tailwind CSS** 🎨: For utility-first styling.

> All rights are reserved &copy; Abheeshta P
