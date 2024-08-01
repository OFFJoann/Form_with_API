import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import Finish from "./emergentes/Finish";
import { EnviarDatos } from "../services/api";
import Finisherror from "./emergentes/Finisherror";

const Form4 = () => {
  const [dataForm4, setdataForm4] = useState({
    enfermedad: '',
    espicifique_enfermedad: '',
    tratamiento: '',
    medicamento: '',
    controlMedico: '',
    alergia_medicamento: '',
    cualalergia_medicamento: '',
    medioTrans: '',
    tiempoTrans: '',
    nomEmg: '',
    parentEmg: '',
    celEmg: '',
    fumador: '',
    bebidas_Alcoholicas: '',
    actividad_Fisica: '',
    frecuencia_ActFisica: '',
  });

  const [disabledFields, setDisabledFields] = useState({
    espicifique_enfermedad: true,
    cualalergia_medicamento: true,
    frecuencia_ActFisica: true,
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpenerror, setModalOpenerror] = useState(false);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('formData4'));
    if (storedData) {
      setdataForm4(storedData);

      setDisabledFields({
        cualalergia_medicamento: storedData.alergia_medicamento === 'No',
        espicifique_enfermedad: storedData.enfermedad !== 'Otros',
        frecuencia_ActFisica: storedData.actividad_Fisica === 'No',
      });
    }
  }, []);

  const history = useHistory();

  const handleSelectChangeform4 = (e) => {
    const { name, value } = e.target;
    setdataForm4((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    const fieldsToDisable = {
      alergia_medicamento: 'cualalergia_medicamento',
      actividad_Fisica: 'frecuencia_ActFisica',
    };

    if (fieldsToDisable[name]) {
      setDisabledFields((prevDisabledFields) => ({
        ...prevDisabledFields,
        [fieldsToDisable[name]]: value === 'No',
      }));

      if (value === 'No') {
        setdataForm4({
          ...dataForm4,
          [name]: value,
          [fieldsToDisable[name]]: '',
        });
      }
    }
  };

  const handleSelectChangeform4enfermedad = (e) => {
    const { name, value } = e.target;
    if (name === 'enfermedad') {
      setDisabledFields((prevDisabledFields) => ({
        ...prevDisabledFields,
        espicifique_enfermedad: value !== 'Otros',
      }));

      setdataForm4((prevData) => ({
        ...prevData,
        [name]: value,
        espicifique_enfermedad: value !== 'Otros' ? '' : prevData.espicifique_enfermedad,
      }));
    } else {
      setdataForm4((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleChangeform4 = (e) => {
    const { name, value } = e.target;
    setdataForm4((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmitform4 = async (e) => {
    e.preventDefault();

    localStorage.setItem('formData4', JSON.stringify(dataForm4));
    const storedFormData1 = JSON.parse(localStorage.getItem('formData')) || {};
    const storedFormData2 = JSON.parse(localStorage.getItem('formData2')) || {};
    const storedFormData3 = JSON.parse(localStorage.getItem('formData3')) || {};
    const storedFormData4 = JSON.parse(localStorage.getItem('formData4')) || {};

    const finalData = {
      ...storedFormData1,
      ...storedFormData2,
      ...storedFormData3,
      ...storedFormData4 
    };
    console.log(finalData)

    const { customHeader, ...data } = finalData;
    const headers = customHeader ? { 'Custom-Header': customHeader } : {};

    try {
      const response = await EnviarDatos(data, headers);
      console.log("Datos enviados", response)
      setModalOpen(true);
    } catch (error) {
      console.error('Error:', error.message);
      setModalOpenerror(true);
    }

  };

  const buttonatras = async (e) => {
    history.push("/form3");
  };

  return (
    <div>
      <form className="formulario">
        <div className='container_title_form'>
          <label className='Title_form' htmlFor="Form1">CONDICIONES DE SALUD</label>
        </div>
        <div className="form-groupll">
          <label htmlFor="enfermedad">¿Padece de alguna enfermedad?:</label>
          <select
            id="enfermedad"
            name="enfermedad"
            value={dataForm4.enfermedad}
            onChange={handleSelectChangeform4enfermedad}
            required
            autoComplete="off"
          >
            <option value="" disabled hidden>Seleccione</option>
            <option value="Diabetes">Diabetes</option>
            <option value="Hipertensión">Hipertensión</option>
            <option value="Hipoglicemia">Hipoglicemia</option>
            <option value="Migraña Aguda">Migraña Aguda</option>
            <option value="Trastorno Mental">Trastorno Mental</option>
            <option value="Otros">Otros</option>
            <option value="Ninguna">Ninguna</option>
          </select>
        </div>
        <div className="form-groupll">
          <label htmlFor="espicifique_enfermedad">Especifíque cuál:</label>
          <input
            type="text"
            id="espicifique_enfermedad"
            name="espicifique_enfermedad"
            value={dataForm4.espicifique_enfermedad}
            onChange={handleChangeform4}
            autoComplete="off"
            disabled={disabledFields.espicifique_enfermedad}
            placeholder={disabledFields.espicifique_enfermedad ? 'N/A' : ''}
          />
        </div>
        <div className="form-groupll">
          <label htmlFor="enfermedad">¿Está bajo tratamiento?:</label>
          <select
            id="tratamiento"
            name="tratamiento"
            value={dataForm4.tratamiento}
            onChange={handleSelectChangeform4}
            required
            autoComplete="off"
          >
            <option value="" disabled hidden>Seleccione</option>
            <option value="Si">Si</option>
            <option value="No">No</option>
          </select>
        </div>
        <div className="form-groupll">
          <label htmlFor="medicamento">¿Estás tomando algún medicamento recetado actualmente?:</label>
          <select
            id="medicamento"
            name="medicamento"
            value={dataForm4.medicamento}
            onChange={handleSelectChangeform4}
            required
            autoComplete="off"
          >
            <option value="" disabled hidden>Seleccione</option>
            <option value="Si">Si</option>
            <option value="No">No</option>
          </select>
        </div>
        <div className="form-groupll">
          <label htmlFor="controlMedico">¿Se encuentra tomando algún tipo de medicamento sin control médico?:</label>
          <select
            id="controlMedico"
            name="controlMedico"
            value={dataForm4.controlMedico}
            onChange={handleSelectChangeform4}
            required
            autoComplete="off"
          >
            <option value="" disabled hidden>Seleccione</option>
            <option value="Si">Si</option>
            <option value="No">No</option>
          </select>
        </div>
        <div className="form-groupll">
          <label htmlFor="alergia_medicamento">¿Es alérgico algún medicamento, alimento, elemento o picadura de algún animal?:</label>
          <select
            id="alergia_medicamento"
            name="alergia_medicamento"
            value={dataForm4.alergia_medicamento}
            onChange={handleSelectChangeform4}
            required
            autoComplete="off"
          >
            <option value="" disabled hidden>Seleccione</option>
            <option value="Si">Si</option>
            <option value="No">No</option>
          </select>
        </div>
        <div className="form-groupll">
          <label htmlFor="cualalergia_medicamento">Cuál o Cuáles:</label>
          <input
            type="text"
            id="cualalergia_medicamento"
            name="cualalergia_medicamento"
            value={dataForm4.cualalergia_medicamento}
            onChange={handleChangeform4}
            disabled={disabledFields.cualalergia_medicamento}
            required={!disabledFields.cualalergia_medicamento}
            placeholder={disabledFields.cualalergia_medicamento ? 'N/A' : 'Especifique'}
            autoComplete="off"
          />
        </div>
      </form>
      <form className="formulario">
        <div className='container_title_form'>
          <label className='Title_form' htmlFor="Form1">HÁBITOS</label>
        </div>
        <div className="form-groupll">
          <label htmlFor="fumador">¿Es usted fumador?:</label>
          <select
            id="fumador"
            name="fumador"
            value={dataForm4.fumador}
            onChange={handleSelectChangeform4}
            required
            autoComplete="off"
          >
            <option value="" disabled hidden>Seleccione</option>
            <option value="Si">Si</option>
            <option value="No">No</option>
          </select>
        </div>
        <div className="form-groupll">
          <label htmlFor="actividad_Fisica">¿Práctica actividad física?:</label>
          <select
            id="actividad_Fisica"
            name="actividad_Fisica"
            value={dataForm4.actividad_Fisica}
            onChange={handleSelectChangeform4}
            required
            autoComplete="off"
          >
            <option value="" disabled hidden>Seleccione</option>
            <option value="Si">Si</option>
            <option value="No">No</option>
          </select>
        </div>
        <div className="form-groupll">
          <label htmlFor="frecuencia_ActFisica">Con qué regularidad práctica:</label>
          <select
            id="frecuencia_ActFisica"
            name="frecuencia_ActFisica"
            value={dataForm4.frecuencia_ActFisica}
            onChange={handleSelectChangeform4}
            disabled={disabledFields.frecuencia_ActFisica}
            required={!disabledFields.frecuencia_ActFisica}
            autoComplete="off"
          >
            <option value="" disabled hidden>Seleccione</option>
            <option value="Si">Todos los días</option>
            <option value="No">3 veces por semana</option>
            <option value="No">1 vez por semana</option>
          </select>
        </div>
        <div className="form-groupll">
          <label htmlFor="bebidas_Alcoholicas">¿Ha sentido alguna vez que debe ingerir menor cantidad de bebidas alcohólicas?:</label>
          <select
            id="bebidas_Alcoholicas"
            name="bebidas_Alcoholicas"
            value={dataForm4.bebidas_Alcoholicas}
            onChange={handleSelectChangeform4}
            required
            autoComplete="off"
          >
            <option value="" disabled hidden>Seleccione</option>
            <option value="Si">Si</option>
            <option value="No">No</option>
          </select>
        </div>


      </form>
      <form className="formulario">
        <div className='container_title_form'>
          <label className='Title_form' htmlFor="Form1">MEDIOS DE TRANSPORTE</label>
        </div>
        <div className="form-groupll">
          <label htmlFor="medioTrans">¿Qué medio de transporte utiliza para desplazarse a la empresa?:</label>
          <select
            id="medioTrans"
            name="medioTrans"
            value={dataForm4.medioTrans}
            onChange={handleSelectChangeform4}
            required
            autoComplete="off"
          >
            <option value="" disabled hidden>Seleccione</option>
            <option value="Automóvil">Automóvil</option>
            <option value="Bicicleta">Bicicleta</option>
            <option value="Caminando">Caminando</option>
            <option value="Motocicleta">Motocicleta</option>
            <option value="Transporte público">Transporte público</option>
            <option value="Otro">Otro</option>
          </select>
        </div>
        <div className="form-groupll">
          <label htmlFor="tiempoTrans">¿Cuánto tiempo se demora desplazándose de su casa al trabajo?:</label>
          <select
            id="tiempoTrans"
            name="tiempoTrans"
            value={dataForm4.tiempoTrans}
            onChange={handleSelectChangeform4}
            required
            autoComplete="off"
          >
            <option value="" disabled hidden>Seleccione</option>
            <option value="30 Min">30 Min</option>
            <option value="45 Min">45 Min</option>
            <option value="1 Hora">1 Hora</option>
            <option value="1 Hora y media">1 Hora y media</option>
            <option value="Otros">Otros</option>
          </select>
        </div>
      </form>
      <form className="formulario" onSubmit={handleSubmitform4}>
        <div className='container_title_form'>
          <label className='Title_form' htmlFor="Form1">CONTACTO DE EMERGENCIA</label>
        </div>
        <div className="form-groupll">
          <label htmlFor="nomEmg">Nombre completo:</label>
          <input
            type="text"
            id="nomEmg"
            name="nomEmg"
            value={dataForm4.nomEmg}
            onChange={handleChangeform4}
            autoComplete="off"
            required
          />
        </div>
        <div className="form-groupll">
          <label htmlFor="parentEmg">Parentesco:</label>
          <input
            type="text"
            id="parentEmg"
            name="parentEmg"
            value={dataForm4.parentEmg}
            onChange={handleChangeform4}
            autoComplete="off"
            required
          />
        </div>
        <div className="form-groupll">
          <label htmlFor="celEmg">Número de contacto:</label>
          <input
            placeholder="(+57)"
            type="text"
            id="celEmg"
            name="celEmg"
            value={dataForm4.celEmg}
            onChange={handleChangeform4}
            onInput={(e) => {
              e.target.value = e.target.value.replace(/\D/g, '');
            }}
            maxLength="10"
            pattern="\d{10}"
            autoComplete="off"
            required
          />
        </div>
        <div className='button-container'>
          <button type='button' className='sig_btn' onClick={buttonatras}>Atrás</button>
          <button type='submit' className='sig_btn'>Terminar</button>

        </div>


      </form>
      {modalOpen && <Finish onClose={() => setModalOpen(false)} />}
      {modalOpenerror && <Finisherror onClose={() => setModalOpenerror(false)} />}

    </div>
  )
}

export default Form4