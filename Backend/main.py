from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import json

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"], 
)

try:
    with open("./datos.json", "r") as file:
        json_data = json.load(file)
except FileNotFoundError:
    json_data = []

class GrupoFamiliar(BaseModel):
    nombres_grpfam: str
    tipdocs_grpfam: str
    numdocs_grpfam: str
    parens_grpfam: str
    oficioescolaridad_grpfam: str
    contactos_grpfam: str

class ExpOtrasEmpresas(BaseModel):
    empresas_exp: str
    cargos_exp: str
    duraciones_exp: str

class HabilidadesCompetencias(BaseModel):
    habilidades_competencias: str

class Idiomas(BaseModel):
    idioma: str

class InputData(BaseModel):
    nombComp: str
    tipoDoc: str
    numDoc: str
    fechaExp: str
    lugarExp: str
    fechaNac: str
    lugarNac: str
    nacionalidad: str
    genero: str
    tipoSangre: str
    grupoEtnico: str
    numCelular: str
    numTel: str
    email: str
    estCivil: str
    cabeFlia: str
    numPersHogar: str
    tieneHijos: str
    numHijos: str
    tienePersonasCargo: str
    numeroPersonasCargo: str
    escolaridad: str
    munResidencia: str
    barrio: str
    dirResidencia: str
    estrato: str
    zonaUbi: str
    tipoVivienda: str
    hogarComp: str
    servInternet: str
    grupo_familiar: list[GrupoFamiliar]
    personasdisca_grpfam: str
    tipodisca_grpfam: str
    srv_Electrico: str
    srv_Acueducto: str
    srv_Gas: str
    puesto_trabajo: str
    dep_Area: str
    fecha_Ingreso: str
    tipo_contrato: str
    jornada_laboral: str
    salario: str
    meses_experiencia: str
    exp_otras_empresas: list[ExpOtrasEmpresas]
    habilidades_competencias: list[HabilidadesCompetencias]
    idiomas: list[Idiomas]
    eps: str
    fondo_de_pensiones: str
    cesantias: str
    enfermedad: str
    espicifique_enfermedad: str
    tratamiento: str
    medicamento: str
    controlMedico: str
    alergia_medicamento: str
    cualalergia_medicamento: str
    medioTrans: str
    tiempoTrans: str
    nomEmg: str
    parentEmg: str
    celEmg: str
    fumador: str
    bebidas_Alcoholicas: str
    actividad_Fisica: str
    frecuencia_ActFisica: str

@app.get("/obtener_json")
def obtener_json():
    return json_data

@app.post("/procesar_informacion")
def procesar_informacion(input_data: InputData):
    try:
        nueva_informacion = input_data.dict()

        json_data.append(nueva_informacion)

        with open("datos.json", "w") as file:
            json.dump(json_data, file, indent=2)

        return {"mensaje": "Información procesada correctamente"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
