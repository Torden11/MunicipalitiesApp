const express = require("express");
const app = express();
const port = 3003;
app.use(express.json({ limit: '10mb' }));
const cors = require("cors");
app.use(cors());
const md5 = require('js-md5');
const uuid = require('uuid');
const mysql = require("mysql");
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json());


const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "municipalities_services",
});

////////////////////LOGIN/////////////////

const doAuth = function(req, res, next) {
    if (0 === req.url.indexOf('/server')) { // admin
        const sql = `
        SELECT
        name, role
        FROM users
        WHERE session = ?
    `;
        con.query(
            sql, [req.headers['authorization'] || ''],
            (err, results) => {
                if (err) throw err;
                if (!results.length || results[0].role !== 10) {
                    res.status(401).send({});
                    req.connection.destroy();
                } else {
                    next();
                }
            }
        );
    } else if (0 === req.url.indexOf('/login-check') || 0 === req.url.indexOf('/login')|| 0 === req.url.indexOf('/register')) {
        next();
    } else { // fron
        const sql = `
        SELECT
        name, role
        FROM users
        WHERE session = ?
    `;
        con.query(
            sql, [req.headers['authorization'] || ''],
            (err, results) => {
                if (err) throw err;
                if (!results.length) {
                    res.status(401).send({});
                    req.connection.destroy();
                } else {
                    next();
                }
            }
        );
    }
}

app.use(doAuth);

// AUTH
app.get("/login-check", (req, res) => {
    const sql = `
         SELECT
         name, role
         FROM users
         WHERE session = ?
        `;
    con.query(sql, [req.headers['authorization'] || ''], (err, result) => {
        if (err) throw err;
        if (!result.length) {
            res.send({ msg: 'error', status: 1 }); // user not logged
        } else {
            if ('admin' === req.query.role) {
                if (result[0].role !== 10) {
                    res.send({ msg: 'error', status: 2 }); // not an admin
                } else {
                    res.send({ msg: 'ok', status: 3 }); // is admin
                }
            } else {
                res.send({ msg: 'ok', status: 4 }); // is user
            }
        }
    });
});

app.post("/login", (req, res) => {
    const key = uuid.v4();
    const sql = `
    UPDATE users
    SET session = ?
    WHERE name = ? AND psw = ?
  `;
    con.query(sql, [key, req.body.user, md5(req.body.pass)], (err, result) => {
        if (err) throw err;
        if (!result.affectedRows) {
            res.status(401).send({ msg: 'error', key: '' });
        } else {
            res.send({ msg: 'ok', key, text: 'Thanks for coming back ' + req.body.user + ' ! :)', type: 'info' });
        }
    });
});

app.post("/register", (req, res) => {
    const key = uuid.v4();
    const sql = `
    INSERT INTO users (name, psw, session)
    VALUES (?, ?, ?)
  `;
    con.query(sql, [req.body.name, md5(req.body.pass), key], (err, result) => {
        if (err) throw err;
        res.send({ msg: 'ok', key, text: 'Welcome to our world!', type: 'info' });
    });
});

///////////////////END////////////////////

//CREATE MUNICIPALITY
app.post("/server/municipalities", (req, res) => {
    const sql = `
    INSERT INTO municipalities (title, image)
    VALUES (?, ?)
    `;
    con.query(sql, [req.body.title, req.body.image], (err, result) => {
        if (err) throw err;
        res.send({ msg: 'OK', text: 'A new municipality has been added.', type: 'success' });
    });
});

//CREATE SERVICE
app.post("/server/services", (req, res) => {
    const sql = `
    INSERT INTO services (title)
    VALUES (?)
    `;
    con.query(sql, [req.body.title], (err, result) => {
        if (err) throw err;
        res.send({ msg: 'OK', text: 'A new service has been added.', type: 'success' });
    });
});

//CREATE COMMENT
app.post("/home/comments", (req, res) => {
    const sql = `
    INSERT INTO comments (post, mun_id, service_id)
    VALUES (?, ?, ?)
    `;
    con.query(sql, [req.body.post, req.body.mun_id, req.body.service_id], (err, result) => {
        if (err) throw err;
        res.send({ msg: 'OK', text: 'Thanks for the post.', type: 'info' });
    });
});



// READ MUNICIPALITY for admin
app.get("/server/municipalities", (req, res) => {
    const sql = `
    SELECT *
    FROM municipalities
    ORDER BY id DESC
    `;
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// READ MUNICIPALITY for home
app.get("/home/municipalities", (req, res) => {
    const sql = `
    SELECT *
    FROM municipalities
    ORDER BY id DESC
    `;
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// READ SERVICE for admin
app.get("/server/services", (req, res) => {
    const sql = `
    SELECT *
    FROM services
    ORDER BY id DESC
    `;
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// READ SERVICE for home
app.get("/home/services", (req, res) => {
    const sql = `
    SELECT *
    FROM services
    ORDER BY id DESC
    `;
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

app.get("/home/comments", (req, res) => {
    const sql = `
    SELECT c.*, m.title AS municipalityTitle, mun_id AS mid, m.image AS municipalityImage, s.title AS serviceTitle, s.id AS sid
    FROM comments AS c
    INNER JOIN municipalities AS m 
    ON c.mun_id = m.id
    INNER JOIN services AS s
    ON c.service_id = s.id
    WHERE c.status = 1
    `;
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// READ COMMENTS for admin

app.get("/server/comments", (req, res) => {
    const sql = `
    SELECT  m.title AS municipalityTitle, mun_id AS mid, s.title AS serviceTitle, c.post, c.status, c.id as comment_id
    FROM comments AS c
    INNER JOIN municipalities AS m
    ON c.mun_id = m.id
    INNER JOIN services AS s
    ON c.service_id = s.id
    `;
    con.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  });



// DELETE MUNICIPALITY
app.delete("/server/municipalities/:id", (req, res) => {
    const sql = `
    DELETE FROM municipalities
    WHERE id = ?
    `;
    con.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        res.send({ msg: 'OK', text: 'The municipality has been deleted.', type: 'info' });
    });
});

// DELETE SERVICE
app.delete("/server/services/:id", (req, res) => {
    const sql = `
    DELETE FROM services
    WHERE id = ?
    `;
    con.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        res.send({ msg: 'OK', text: 'The service has been deleted.', type: 'info' });
    });
});

app.delete("/server/comments/:id", (req, res) => {
    const sql = `
    DELETE FROM comments
    WHERE id = ?
    `;
    con.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        res.send({ msg: 'OK', text: 'Unappropriate comment has been deleted.', type: 'info' });
    });
});


//UPDATE MUNICIPALITY
app.put("/server/municipalities/:id", (req, res) => {
    let sql;
    let r;
    if (req.body.deletePhoto) {
        sql = `
        UPDATE municipalities
    
        SET title = ?, image = null
        WHERE id = ?
        `;
        r = [req.body.title, req.params.id];
    } else if (req.body.image) {
        sql = `
        UPDATE municipalities
    
        SET title = ?, image = ?
        WHERE id = ?
        `;
        r = [req.body.title, req.body.image, req.params.id];
    } else {
        sql = `
        UPDATE municipalities
    
        SET title = ?,
        WHERE id = ?
        `;
        r = [req.body.title, req.params.id]
    }
    con.query(sql, r, (err, result) => {
        if (err) throw err;
        res.send({ msg: 'OK', text: 'The municipality has been edited.', type: 'success' });
    });
});

//UPDATE SERVICES
app.put("/server/services/:id", (req, res) => {
    const sql = `
      UPDATE services
      SET title = ?
      WHERE id = ?
      `;
    con.query(sql, [req.body.title, req.params.id], (err, result) => {
      if (err) throw err;
      res.send({ msg: 'OK', text: 'The service has been edited.', type: 'success' });
    });
  });

  // UPDATE COMMENTS for admin

app.put("/server/comments/:id", (req, res) => {
    const sql = `
      UPDATE comments
      SET status = ?
      WHERE id = ?
      `;
    con.query(sql, [req.body.status, req.params.id], (err, result) => {
      if (err) throw err;
      res.send({ msg: 'OK', text: 'The comment has been approved.', type: 'success' });
    });
  });

app.listen(port, () => {
    console.log(`Savyvaldybes yra registruotos ${port} porte!`)
});






// // READ
// // SELECT column1, column2, ...
// // FROM table_name;

// // app.get("/trees/:tipas", (req, res) => {

// //     // console.log(req.query.sort);

// //     const sql = `
// //     SELECT id, type, title, height
// //     FROM trees
// //     WHERE type = ? OR type = ?
// //     `;
// //     con.query(sql, [req.params.tipas, req.query.sort], (err, result) => {
// //         if (err) throw err;
// //         res.send(result);
// //     });
// // });

// // INNER JOIN
// // SELECT column_name(s)
// // FROM table1
// // INNER JOIN table2
// // ON table1.column_name = table2.column_name;
// app.get("/get-it/inner-join", (req, res) => {
//     const sql = `
//     SELECT c.id, p.id AS pid, name, phone
//     FROM clients AS c
//     INNER JOIN phones AS p
//     ON c.id = p.client_id
//     `;
//     con.query(sql, (err, result) => {
//         if (err) throw err;
//         res.send(result);
//     });
// });

// app.get("/get-it/left-join", (req, res) => {
//     const sql = `
//     SELECT c.id, p.id AS pid, name, phone
//     FROM clients AS c
//     LEFT JOIN phones AS p
//     ON c.id = p.client_id
//     `;
//     con.query(sql, (err, result) => {
//         if (err) throw err;
//         res.send(result);
//     });
// });

// app.get("/get-it/right-join", (req, res) => {
//     const sql = `
//     SELECT c.id, p.id AS pid, name, phone
//     FROM clients AS c
//     RIGHT JOIN phones AS p
//     ON c.id = p.client_id
//     `;
//     con.query(sql, (err, result) => {
//         if (err) throw err;
//         res.send(result);
//     });
// });





// // READ (all)
// app.get("/trees", (req, res) => {
//     const sql = `
//     SELECT id, type, title, height
//     FROM trees
//     `;
//     con.query(sql, (err, result) => {
//         if (err) throw err;
//         res.send(result);
//     });
// });

// //CREATE
// // INSERT INTO table_name (column1, column2, column3, ...)
// // VALUES (value1, value2, value3, ...);
// app.post("/trees", (req, res) => {
//     const sql = `
//     INSERT INTO trees (title, height, type)
//     VALUES (?, ?, ?)
//     `;
//     con.query(sql, [req.body.title, req.body.height, req.body.type], (err, result) => {
//         if (err) throw err;
//         res.send(result);
//     });
// });


// //DELETE
// // DELETE FROM table_name WHERE condition;
// app.delete("/trees/:id", (req, res) => {
//     const sql = `
//     DELETE FROM trees
//     WHERE id = ?
//     `;
//     con.query(sql, [req.params.id], (err, result) => {
//         if (err) throw err;
//         res.send(result);
//     });
// });


// //EDIT
// // UPDATE table_name
// // SET column1 = value1, column2 = value2, ...
// // WHERE condition;
// app.put("/trees/:id", (req, res) => {
//     const sql = `
//     UPDATE trees
//     SET title = ?, height = ?, type = ?
//     WHERE id = ?
//     `;
//     con.query(sql, [req.body.title, req.body.height, req.body.type, req.params.id], (err, result) => {
//         if (err) throw err;
//         res.send(result);
//     });
// });