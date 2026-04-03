import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../components/ui/use-toast';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('IT');
  const [role, setRole] = useState<'student'|'admin'>('student');

  const { login, register } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await login({ email, password });
        toast({ title: 'Logged in successfully' });
      } else {
        await register({ name, email, password, role, department });
        toast({ title: 'Registered successfully' });
      }
      navigate('/');
    } catch (error: any) {
      toast({
        title: 'Authentication Failed',
        description: error.response?.data?.message || 'Something went wrong',
        variant: 'destructive'
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <div className="w-full max-w-md p-8 space-y-6 bg-card rounded-lg border border-border shadow-sm">
        <h2 className="text-2xl font-bold text-center">
          {isLogin ? 'Sign In' : 'Create Account'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text" required
                  className="w-full px-3 py-2 border rounded-md bg-transparent"
                  value={name} onChange={e => setName(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Role</label>
                  <select
                    className="w-full px-3 py-2 border rounded-md bg-background"
                    value={role} onChange={e => setRole(e.target.value as 'student'|'admin')}
                  >
                    <option value="student">Student</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Dept.</label>
                  <select
                    className="w-full px-3 py-2 border rounded-md bg-background"
                    value={department} onChange={e => setDepartment(e.target.value)}
                  >
                    <option value="IT">IT</option>
                    <option value="CSE">CSE</option>
                    <option value="ECE">ECE</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>
              </div>
            </>
          )}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email" required
              className="w-full px-3 py-2 border rounded-md bg-transparent"
              value={email} onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password" required
              className="w-full px-3 py-2 border rounded-md bg-transparent"
              value={password} onChange={e => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-primary text-primary-foreground rounded-md transition-opacity hover:opacity-90"
          >
            {isLogin ? 'Sign In' : 'Sign Up'}
          </button>
        </form>
        <p className="text-center text-sm">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-primary hover:underline"
          >
            {isLogin ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;
