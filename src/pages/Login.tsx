import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';
import { auth } from '../firebase';
import { useLoginMutation } from '../redux/api/userAPI';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { MessageResponse } from '../types/api-types';
const Login = () => {
  const [gender, setGender] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [login] = useLoginMutation();
  const loginHandler = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);
      const res = await login({
        name: user.displayName!,
        email: user.email!,
        photo: user.photoURL!,
        gender,
        role: 'user',
        dob: date,
        _id: user.uid,
      });
      if ('data' in res) {
        toast.success(res.data.message);
      } else {
        const error = res.error as FetchBaseQueryError;
        const message = (error.data as MessageResponse).message;
        toast.error(message);
      }
    } catch (error) {
      toast.error('Falha no login');
    }
  };

  return (
    <div className="login">
      <main>
        <h1 className="heading">Login</h1>

        <div>
          <label>Gênero</label>
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">Selecione o gênero</option>
            <option value="male">Masculino</option>
            <option value="female">Feminino</option>
          </select>
        </div>

        <div>
          <label>Data de nascimento</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div>
          <p>Já fez login uma vez</p>
          <button onClick={loginHandler}>
            <FcGoogle />
            <span>Entrar com o Google</span>
          </button>
        </div>
      </main>
    </div>
  );
};

export default Login;
