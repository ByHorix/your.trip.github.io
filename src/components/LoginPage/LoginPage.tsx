import React, {FormEventHandler, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styles from './LoginPage.module.scss';
import {app} from '../../config/firebaseConfig';
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {ButtonGroup} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

const LoginPage: React.FC = () => {
    const navigate = useNavigate();

    const auth = getAuth(app);

    const [formData, setFormData] = useState({email: '', password: ''});

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {target} = e;

        setFormData((prevState) => ({
            ...prevState,
            [target.type]: target.value
        }));
    };

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        try {
            const response = await signInWithEmailAndPassword(auth, formData.email, formData.password);

            const idToken = await response.user.getIdToken();
            localStorage.setItem('token', idToken);

            navigate('/home');
        }
        catch (e: any) {
            alert(e.message);
        }
    };

    return (
        <div className={styles.background}>
            <div className={styles.formContainer}>
                <Form onSubmit={handleSubmit} className={styles.form}>
                    <h3>
                        Пожалуйста, введите данные для входа
                    </h3>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control
                            required
                            type="email"
                            placeholder="email"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control
                            required
                            type="password"
                            placeholder="пароль"
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Отправить
                    </Button>
                    <hr/>
                    <div className={styles.btnGroup}>
                        <ButtonGroup className={styles.btnGroup}>
                            <Button disabled variant="outline-primary" className={styles.login}>
                                Вход
                            </Button>
                            <Button
                                onClick={() => navigate('/register')} className={styles.register}>
                                Регистрация
                            </Button>
                        </ButtonGroup>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default LoginPage;

