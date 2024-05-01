import { Button, Layout, Select, Space, Modal, Drawer } from 'antd';
import { useCrypto } from '../../context/cryprto-context';
import { useEffect, useState } from 'react';
import CoinInfoModal from '../coinInfoModal';
import AddAssetForm from '../AddAssetForm';

const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: 'white',
    textAlign: 'center',
    padding: '1rem',
    width: '100%',
    height: 60,
};

export default function AppHeader() {
    const [select, setSelect] = useState(false)
    const [coin, setCoin] = useState(null)
    const [modal, setModal] = useState(false)
    const [drawer, setDrawer] = useState(false)
    const { crypto } = useCrypto()
    useEffect(() => {
        const keypress = (event) => {
            if (event.key === '/') {
                setSelect((prev) => !prev)
            }
        }
        document.addEventListener('keypress', keypress)
        return () => document.removeEventListener('keypress', keypress)
    }, [])

    const handleSelect = (value) => {
        setCoin(crypto.find((c) => c.id === value))
        setModal(true)
    }
    return (
        <Layout.Header style={headerStyle}>
            <Select
                style={{
                    width: 250,
                }}
                open={select}
                onSelect={handleSelect}
                onClick={() => setSelect((prev) => !prev)}
                value="press / to open"
                options={crypto.map(coin => ({
                    label: coin.name,
                    value: coin.id,
                    icon: coin.icon
                }))}
                optionRender={(option) => (
                    <Space>
                        <img src={option.data.icon} alt={option.data.label} width={30} /> {option.data.label}
                    </Space>
                )}
            />
            <Button type='primary' onClick={() => setDrawer(true)}>Add Asset</Button>
            <Modal
                open={modal}
                onCancel={() => setModal(false)}
                footer={null}
            >
                <CoinInfoModal coin={coin} />
            </Modal>
            <Drawer
                width={600}
                title="Add Asset"
                onClose={() => setDrawer(false)}
                open={drawer}
                destroyOnClose
            >
                <AddAssetForm onClose={() => setDrawer(false)} />
            </Drawer>
        </Layout.Header>
    )
}