import { Button, Result } from 'antd';
import { useContext, useEffect } from 'react';
import { CartContext } from '../context/CartProvider';

const SuccessPage = () => {
    const { setCartItems } = useContext(CartContext)

    useEffect(() => {
        setCartItems([])
    }, [setCartItems])

    return (
        < div className='success-page' >
            <div className='container'>
                <Result
                    status="success"
                    title="Ödeme İşlemi Başarılı"
                    subTitle="Siparişiniz Tamamlandı"
                    extra={[
                        <Button type="primary" key="console" href='/'>
                            Ana Sayfa
                        </Button>,
                        <Button key="buy" >Siparişlerim</Button>,
                    ]}
                />
            </div>
        </div >
    )
}

export default SuccessPage