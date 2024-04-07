const date: Date = new Date()

export default function CopyRight() {

    return (
        <span>
            Copyright {date.getFullYear()} © CoinTrackX
        </span>
    )
}