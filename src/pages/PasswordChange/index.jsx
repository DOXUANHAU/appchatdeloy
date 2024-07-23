import React, {useState} from 'react';
import styles from './styles.module.css';
import { useNavigate } from 'react-router-dom'; // Sử dụng React Router

const ChangePassword= () => {
    const navigate = useNavigate();
    const [modalVisible, setModalVisible] = useState(false);


    const handleContinue = () => {
        setModalVisible(true);
    };

    const handleCancel = () => {
        navigate("/info")
    }
    const closeModal = () => {
        setModalVisible(false);
    };

    const redirectToAccountInfo = () => {
        navigate("/info")
    };
    const handleLogout = () => {
        // Xóa thông tin đăng nhập khỏi localStorage hoặc gọi API để đăng xuất
        localStorage.removeItem('token');

        // Điều hướng về trang đăng nhập
        navigate('/');
    };
    const informationForward = () =>{
        navigate('/info');
    }

    const protectAccForward = () =>{
        navigate('/acc_protect');
    }


    const historyForward = () =>{
        navigate('/history');
    }

    return (
        <div className={styles.contain}>
            <div className={styles.main}>
                <div className={styles.left}>
                    <div className={styles.container}>
                        <div className={styles.avatar}>

                            <div className={styles.avatarContainer}>

                                <div className={styles['back-arrow']} onClick={() => navigate('/home')}>
                                    &#8592; {}
                                </div>
                                <img
                                    className={styles.avatar}
                                    src="https://www.w3schools.com/howto/img_avatar.png"
                                    alt="Avatar"
                                /></div>                        </div>
                    </div>

                    <div className={styles.function}>
                        <div className={styles['function-item']} onClick={informationForward}>

                            <h4>Thông tin tài khoản</h4>
                            <span>Quản lý thông tin đăng nhập và thông tin cá nhân</span>

                        </div>

                        <div className={styles['function-item']} onClick={protectAccForward}>
                            <h4>Bảo vệ tài khoản</h4>
                            <span>Hỗ trợ bảo vệ tài khoản</span>
                        </div>
                        <div className={styles['function-item']} onClick={historyForward}>
                            <h4>Nhật kí hoạt động</h4>
                            <span>Lịch sử hoạt động của tài khoản</span>
                        </div>

                    </div>
                </div>
                <div className={styles.right}>
                    <div className={styles.title}>
                        <h2>Thay đổi mật khẩu</h2>
                    </div>
                    <div className={styles['title-info']}>
                        <h3>Thông tin đăng nhập</h3>
                        <div className={styles['info-item']}>
                            <label htmlFor="number">Mật khẩu hiện tại :</label>
                        </div>
                        <div className={styles['info-item']}>
                            <label htmlFor="password">Mật khẩu mới :</label>
                        </div>
                        <div className={styles['info-item']}>
                            <label htmlFor="password">Nhập lại mật khẩu mới :</label>
                        </div>
                        <div className={styles['button-confirm']}>
                            <button className={styles.continue} onClick={handleContinue}>Tiếp tục</button>
                            <button className={styles.cancel} onClick={handleCancel}>Hủy bỏ</button>
                        </div>
                        {modalVisible && (
                            <div id="myModal" className={styles.modal} style={{display: 'flex'}}>
                                <div className={styles['modal-content']}>
                                    <span className={styles.close} onClick={closeModal}>&times;</span>
                                    <p>Cập nhật thành công!</p>
                                    <button onClick={redirectToAccountInfo}>OK</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChangePassword;