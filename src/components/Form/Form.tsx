import React from 'react'
import { QRCodeSVG } from 'qrcode.react';
import './style.css'

const Form = () => {

    const [url, setUrl] = React.useState<string>("")
    const [inputDirty, setInputDirty] = React.useState<boolean>(false)
    const [urlError, setUrlError] = React.useState<string>("Поле не может быть пустым")
    const [formValid, setFormValid] = React.useState<boolean>(false)
    const [flag, setFlag] = React.useState<string>("")

    React.useEffect(() => {
        if (urlError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [urlError])

    const blurHandler = (event: any) => {
        switch (event.target.name) {
            case "url" :
                setInputDirty(true)
                break
        }
    }

    const urlHandler = (title: string) => {
        setFlag(title)
        if (title) {
            setUrlError("")
        } else {
            setUrlError("Поле не может быть пустым")
        }
    }

    const generateQR = (event: any) => {
        event.preventDefault()
        setUrl(flag)
    }

    return (
        <>
           <div className = "form__wrapper">
            <form className = "form__container">
                <div className = "form-title__container">
                    <h3 className = "form-title__container-text">QR-CODE GENERATOR</h3>
                </div>
                <div className = "input-container">
                    <div className="form-group">
                    {(inputDirty && urlError) && <div className = "input-error__text">{urlError}</div>}
                        <input 
                            placeholder = "Ссылка..."
                            onBlur = {event => blurHandler(event)}
                            onChange = {(event) => urlHandler(event.target.value)}
                            name = "url" 
                            type = "url" 
                            className="form-control input-reg-form" 
                            id="inputUrl" 
                            aria-describedby="urlHelp"></input>
                    </div>
                </div>
                <div className = "form-footer">
                    <button disabled = {!formValid} onClick = {(event) => generateQR(event)} type="submit" className="btn btn-primary generate-btn">
                        <p className = "generate-btn__text">Сгенерировать</p>
                    </button>
                    {
                        url === ""
                    ?
                        null
                    :
                        <QRCodeSVG value={url} className = "qrCode"/>
                    }
                </div>
            </form>
            </div> 
        </>
    )
}

export default React.memo(Form)