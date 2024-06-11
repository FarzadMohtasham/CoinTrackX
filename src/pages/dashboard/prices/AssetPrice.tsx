import {useParams} from "react-router-dom";

export default function AssetPrice() {
    const {assetName} = useParams()

    return (
        <div>
            {assetName}
        </div>
    )
}