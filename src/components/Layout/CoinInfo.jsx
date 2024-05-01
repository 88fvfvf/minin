import { Typography } from "antd";

export default function CoinInfo({ coin, withSymbol }) {
    return (
        <Typography.Title level={2} style={{ display: 'flex', alignItems: 'center', margin: 0, gap: 10 }}>
            <img src={coin.icon} alt={coin.name} width={30} />
            <span>{withSymbol && <span>({coin.symbol})</span>} {coin.name}</span>
        </Typography.Title>
    )
}