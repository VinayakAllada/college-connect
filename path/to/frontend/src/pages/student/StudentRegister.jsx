// ... existing code ...
import authService from '../../services/authService'; // Adjust path as needed

const StudentRegister = () => {
  // ... existing state and handlers ...

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      // ... append form data ...

      const response = await authService.registerStudent(data);
      toast.success("Registered successfully!");
      navigate("/student/home");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Registration failed. Try again."
      );
    }
  };

  // ... rest of the component ...
};