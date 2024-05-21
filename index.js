console.log("Hola desde el archivo indexjs mami borra las fotos");
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();       //se crea la instancia del servidor express, normalmente es con el nombre "app"


//normalmente se les conoce como middlewares son interpretes para conectar archivos json con js o entre puertos o pc´s
app.use(express.json());
app.use(cors());

//iniciamos el servidor JAJJASJJASJ
const PORT = 3000
app.listen(PORT, ()=>{
    console.log("Prueba del Inicio del listener del servidor del http://localhost    "+PORT);
})

//conexion con Mysql jijija

const connection = mysql.createConnection({
    host:"LocalHost",
    user:"root",
    password: "",
    port:3306,
    database:"topicos"
});
connection.connect((err)=>{
    if(err){
        console.error(err.message || "Dont connected to database");
    }else{
        console.log("Connected to database");
    }
})

app.get("/",(req,res)=>{
        
    connection.query("SELECT * FROM ususarios",(error,results)=>{       //*Se declara con el SELECT Y el FROM para acceder a los datos con el nombre de la tabla
        //!cuando es solo una linea el if no puede llevar llaves "{}"
        if(error) res.status(500).json({message: error.message || "Dont Release data in this moment for de user table"});
        else res.status(200).json(results);
    });           
});


app.post("/",(req,res)=>{
    //*necesitamos insomia para poder mandar el post
    const {nombre} = req.body;
    connection.query('INSERT INTO ususarios VALUES (DEFAULT,"'+nombre+'")',(error,results)=>{
        if (error) res.status(500).json({message:error.message || "Dont instert deta in this moment"});
        else res.json(results);
    });
});

app.patch("/",(req,res)=>{
    const {id,nombre} = req.body;
    connection.query(`UPDATE ususarios SET Nombre="${nombre}" WHERE id=${id}`,(error,results)=>{
        if(error) res.status(500).json({message:error.message || "Dont update in this moment"});
        else res.json(results);
    });
});

app.delete("/",(req,res)=>{
    const {id} = req.body;
    connection.query(`DELETE FROM ususarios WHERE id=${id}`,(error,results)=>{
        if(error) res.status(500).json({message:error.message || "Dont delete in this moment"});
        else res.json(results);
    });
});