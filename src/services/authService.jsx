import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';

// Maneja todas las solicitudes de autenticación
export const authService = {
    // Registrar un nuevo usuario
    registerUser: async (email, password, displayName) => {
        try {
            // record de autenticación
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // crear el documento en la collection
            await setDoc(doc(db, 'users', user.uid), {
                uid: user.uid,
                email: user.email,
                displayName: displayName,
                role: 'client', // default para registro desde el login
                createdAt: new Date(),
                lastLogin: new Date(),
                isActive: true
            });

            return user;
        } catch (error) {
            // errores comunes
            switch (error.code) {
                case 'auth/email-already-in-use':
                    throw new Error('Este correo electrónico ya está registrado');
                case 'auth/invalid-email':
                    throw new Error('El correo electrónico no es válido');
                case 'auth/weak-password':
                    throw new Error('La contraseña debe tener al menos 6 caracteres');
                default:
                    throw error;
            }
        }
    },

    // Login usuario existente
    loginUser: async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            return userCredential.user;
        } catch (error) {
            switch (error.code) {
                case 'auth/user-not-found':
                    throw new Error('Usuario no encontrado');
                case 'auth/wrong-password':
                    throw new Error('Contraseña incorrecta');
                default:
                    throw error;
            }
        }
    }
};