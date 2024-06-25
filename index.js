const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const port = 5000;
const connection = mysql.createConnection({
  host: "dexnovelmysql-dexprojectkk-b7a4.c.aivencloud.com",
  port: 18541,
  user: "avnadmin",
  password: "",
  database: "dexnovel",
});

const app = express();
app.use(cors());
app.use(express.json());
//login
app.get("/login", function (req, res, next) {
  connection.query("SELECT * from loginview;", function (err, results, fields) {
    res.json(results);
    console.log(results);
  });
});
//view admin ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
app.get("/view/admin", function (req, res, next) {
  connection.query("SELECT * FROM `admin`", function (err, results, fields) {
    res.json(results);
    console.log(results);
  });
});
//search admin
app.get("/view/admin/:id", function (req, res, next) {
  const id = req.params.id;
  connection.query(
    "SELECT * FROM `admin` WHERE `id` =?",
    [id],
    function (err, results) {
      res.json(results);
    }
  );
});
//
app.get("/view/export", function (req, res, next) {
  let { id } = req.query; // Expecting an array of IDs

  // Ensure 'id' is always an array
  if (!id) {
    return res.status(400).json({ error: "ID must be provided" });
  }

  if (!Array.isArray(id)) {
    id = [id];
  }

  if (id.length === 0) {
    return res.status(400).json({ error: "ID must be a non-empty array" });
  }

  const placeholders = id.map(() => "?").join(","); // Create placeholders for the query
  const query = `SELECT * FROM admin WHERE id IN (${placeholders})`;

  connection.query(query, id, function (err, results) {
    if (err) {
      return next(err);
    }
    res.json(results);
  });
});
//insert admin
app.post("/create/admin", function (req, res, next) {
  connection.query(
    "INSERT INTO `admin`(`f_name`, `l_name`, `gender`, `date_of_birth`, `tel`, `address`, `avatar`,`user_name`,`gmail`,`password`,`status`) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
    [
      req.body.f_name,
      req.body.l_name,
      req.body.gender,
      req.body.date_of_birth,
      req.body.tel,
      req.body.address,
      req.body.avatar,
      req.body.user_name,
      req.body.gmail,
      req.body.password,
      req.body.status,
    ],
    function (err, results) {
      res.json(results);
    }
  );
});
// Update Admin
app.put("/update/admin/:id", function (req, res, next) {
  const id = req.params.id;
  const {
    f_name,
    l_name,
    gender,
    date_of_birth,
    tel,
    address,
    avatar,
    user_name,
    gmail,
    password,
    status,
  } = req.body;

  connection.query(
    "UPDATE `admin` SET  `f_name` = ?,`l_name` = ?,`gender` = ?,`date_of_birth` = ?,`tel` = ?,`address` = ?,`avatar` = ?,`user_name` = ?,`gmail` = ?,`password` = ?,`status` = ? WHERE `id` = ?",
    [
      f_name,
      l_name,
      gender,
      date_of_birth,
      tel,
      address,
      avatar,
      user_name,
      gmail,
      password,
      status,
      id,
    ],
    function (err, results) {
      if (err) {
        return next(err);
      }
      res.json(results);
    }
  );
});
//Delete Admin
app.delete("/delete/admin", function (req, res, next) {
  const { id } = req.body; // Expecting an array of tag IDs

  if (!Array.isArray(id) || id.length === 0) {
    return res.status(400).json({ error: "Tag_ids must be a non-empty array" });
  }

  const placeholders = id.map(() => "?").join(","); // Create placeholders for the query
  const query = `DELETE FROM admin WHERE id IN (${placeholders})`;

  connection.query(query, id, function (err, results) {
    if (err) {
      return next(err);
    }
    res.json(results);
  });
});
//view author =================================================================================================
app.get("/view/author", function (req, res, next) {
  connection.query("SELECT * FROM `author`", function (err, results, fields) {
    res.json(results);
    console.log(results);
  });
});
//search admin
app.get("/view/author/:id", function (req, res, next) {
  const id_author = req.params.id;
  connection.query(
    "SELECT * FROM `author` WHERE `id_author` =?",
    [id_author],
    function (err, results) {
      res.json(results);
    }
  );
});
//insert author
app.post("/create/author", function (req, res, next) {
  const {
    id_author,
    realname,
    penname,
    gender,
    date_of_birth,
    address,
    gmail,
    user_name,
    password,
    avatar,
    status,
    contact_channels,
  } = req.body;
  connection.query(
    "INSERT INTO `author`(`id_author`,`realname` , `penname` , `gender` , `date_of_birth` , `address` , `gmail` , `user_name` ,`password`, `avatar` , `status` ,`contact_channels`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",
    [
      id_author,
      realname,
      penname,
      gender,
      date_of_birth,
      address,
      gmail,
      user_name,
      password,
      avatar,
      status,
      contact_channels,
    ],
    function (err, results) {
      res.json(results);
    }
  );
});
// Update author
app.put("/update/author/:id", function (req, res, next) {
  const id_author = req.params.id;
  const {
    realname,
    penname,
    gender,
    date_of_birth,
    address,
    gmail,
    user_name,
    password,
    avatar,
    status,
    contact_channels,
  } = req.body;

  connection.query(
    "UPDATE `author` SET  `realname` = ?, `penname` = ?, `gender` = ?, `date_of_birth` = ?, `address` = ?, `gmail` = ?, `user_name` = ?,`password` = ?, `avatar` = ?, `status` = ?,`contact_channels` = ? WHERE `id_author` = ?",
    [
      realname,
      penname,
      gender,
      date_of_birth,
      address,
      gmail,
      user_name,
      password,
      avatar,
      status,
      contact_channels,
      id_author,
    ],
    function (err, results) {
      if (err) {
        return next(err);
      }
      res.json(results);
    }
  );
});
//Delete user
app.delete("/delete/author", function (req, res, next) {
  const { id_author } = req.body; // Expecting an array of tag IDs

  if (!Array.isArray(id_author) || id_author.length === 0) {
    return res.status(400).json({ error: "Tag_ids must be a non-empty array" });
  }

  const placeholders = id_author.map(() => "?").join(","); // Create placeholders for the query
  const query = `DELETE FROM admin WHERE id IN (${placeholders})`;

  connection.query(query, id_author, function (err, results) {
    if (err) {
      return next(err);
    }
    res.json(results);
  });
});
//view user ======================================================================================================
app.get("/view/user", function (req, res, next) {
  connection.query("SELECT * FROM `user`", function (err, results, fields) {
    res.json(results);
    console.log(results);
  });
});
//search user
app.get("/view/user/:id", function (req, res, next) {
  const id = req.params.id;
  connection.query(
    "SELECT * FROM `user` WHERE `id_user` =?",
    [id],
    function (err, results) {
      res.json(results);
    }
  );
});
//insert user
app.post("/create/user", function (req, res, next) {
  connection.query(
    "INSERT INTO `user`(`id_user`, `user_name`, `password`, `gender`, `gmail`, `year`, `status`,`avatar`) VALUES (?,?,?,?,?,?,?,?)",
    [
      req.body.id_user,
      req.body.user_name,
      req.body.password,
      req.body.gender,
      req.body.gmail,
      req.body.year,
      req.body.status,
      req.body.avatar,
    ],
    function (err, results) {
      res.json(results);
    }
  );
});
// Update user
app.put("/update/user/:id", function (req, res, next) {
  const id_user = req.params.id;
  const { user_name, password, gender, gmail, status, avatar, year } = req.body;

  connection.query(
    "UPDATE `user` SET `user_name` = ?, `password` = ?, `gender` = ?, `gmail` = ?, `year` = ?, `status` = ?,`avatar` = ? WHERE `id_user` = ?",
    [user_name, password, gender, gmail, status, avatar, year, id_user],
    function (err, results) {
      if (err) {
        return next(err);
      }
      res.json(results);
    }
  );
});
//Delete user
app.delete("/delete/user", function (req, res, next) {
  const { id_user } = req.body; // Expecting an array of tag IDs

  if (!Array.isArray(id_user) || id_user.length === 0) {
    return res.status(400).json({ error: "Tag_ids must be a non-empty array" });
  }

  const placeholders = id_user.map(() => "?").join(","); // Create placeholders for the query
  const query = `DELETE FROM user WHERE id_user IN (${placeholders})`;

  connection.query(query, id_user, function (err, results) {
    if (err) {
      return next(err);
    }
    res.json(results);
  });
});
//SELECT novel ====================================================================================================
app.get("/novel", function (req, res, next) {
  connection.query("SELECT * FROM `novel`", function (err, results, fields) {
    res.json(results);
    console.log(results);
  });
});
//SELECT episode_novel==========================================================================================================
app.get("/episode_novel", function (req, res, next) {
  connection.query(
    "SELECT * FROM `episode_novel`",
    function (err, results, fields) {
      res.json(results);
      console.log(results);
    }
  );
});
//SELECT reading ===========================================================================================================
app.get("/reading", function (req, res, next) {
  connection.query("SELECT * FROM `reading`", function (err, results, fields) {
    res.json(results);
    console.log(results);
  });
});
//SELECT report ====================================================================================================
app.get("/report", function (req, res, next) {
  connection.query("SELECT * FROM `report`", function (err, results, fields) {
    res.json(results);
    console.log(results);
  });
});

//search user
app.get("/view/novel/:id", function (req, res, next) {
  const id = req.params.id;
  connection.query(
    "SELECT * FROM `novel` WHERE `id_novel` =?",
    [id],
    function (err, results) {
      res.json(results);
    }
  );
});
//search user
app.get("/view/episode_novel/:id", function (req, res, next) {
  const id = req.params.id;
  connection.query(
    "SELECT * FROM `episode_novel` WHERE `id_episode_novel` =?",
    [id],
    function (err, results) {
      res.json(results);
    }
  );
});

//SELECT together  ------------------------------------------------------
app.get("/together", function (req, res, next) {
  connection.query("SELECT * FROM `together`", function (err, results, fields) {
    res.json(results);
    console.log(results);
  });
});
//-------------------------------------------------------------
//SELECT taeknovel
app.get("/taeknovel", function (req, res, next) {
  connection.query(
    "SELECT * FROM `taeknovel`",
    function (err, results, fields) {
      res.json(results);
      console.log(results);
    }
  );
});
//search tag name
app.get("/taeknovel/:id", function (req, res, next) {
  const id = req.params.id;
  connection.query(
    "SELECT * FROM `taeknovel` WHERE `name_taek` LIKE CONCAT('%',?, '%')",
    [id],
    function (err, results) {
      if (err) {
        return next(err);
      }
      res.json(results);
    }
  );
});
//search tag name
app.get("/taeknovel/id_tag/:id", function (req, res, next) {
  const id_taekd = req.params.id;
  connection.query(
    "SELECT * FROM `taeknovel` WHERE `id_taek` = ?",
    [id_taekd],
    function (err, results) {
      if (err) {
        return next(err);
      }
      res.json(results);
    }
  );
});

//inser tags
app.post("/create/tags", function (req, res, next) {
  const { id_taek, name_taek } = req.body;
  connection.query(
    "INSERT INTO `taeknovel`(`id_taek`,`name_taek`) VALUES (?,?)",
    [id_taek, name_taek],
    function (err, results) {
      res.json(results);
    }
  );
});
// Update tags
app.put("/update/tags/:id", function (req, res, next) {
  const id_taek = req.params.id;
  const { name_taek } = req.body;

  connection.query(
    "UPDATE `taeknovel` SET  `name_taek` = ? WHERE `id_taek` = ?",
    [name_taek, id_taek],
    function (err, results) {
      if (err) {
        return next(err);
      }
      res.json(results);
    }
  );
});
//Delete Tag
app.delete("/delete/tag", function (req, res, next) {
  const { tag_ids } = req.body; // Expecting an array of tag IDs

  if (!Array.isArray(tag_ids) || tag_ids.length === 0) {
    return res.status(400).json({ error: "Tag_ids must be a non-empty array" });
  }

  const placeholders = tag_ids.map(() => "?").join(","); // Create placeholders for the query
  const query = `DELETE FROM taeknovel WHERE id_taek IN (${placeholders})`;

  connection.query(query, tag_ids, function (err, results) {
    if (err) {
      return next(err);
    }
    res.json(results);
  });
});
//*************************************************************************************** */
//SELECT typenovel
app.get("/typenovel", function (req, res, next) {
  connection.query(
    "SELECT * FROM `typenovel`",
    function (err, results, fields) {
      res.json(results);
      console.log(results);
    }
  );
});
//search tag name
app.get("/typenovel/:id", function (req, res, next) {
  const id_type = req.params.id;
  connection.query(
    "SELECT * FROM `typenovel` WHERE `id_type` = ?",
    [id_type],
    function (err, results) {
      if (err) {
        return next(err);
      }
      res.json(results);
    }
  );
});

//inser type
app.post("/create/type", function (req, res, next) {
  const { id_type, name_type } = req.body;
  connection.query(
    "INSERT INTO `typenovel`(`id_type`,`name_type`) VALUES (?,?)",
    [id_type, name_type],
    function (err, results) {
      res.json(results);
    }
  );
});
// Update tags
app.put("/update/type/:id", function (req, res, next) {
  const id_type = req.params.id;
  const { name_type } = req.body;

  connection.query(
    "UPDATE `typenovel` SET  `name_type` = ? WHERE `id_type` = ?",
    [name_type, id_type],
    function (err, results) {
      if (err) {
        return next(err);
      }
      res.json(results);
    }
  );
});
//Delete Tag
app.delete("/delete/type", function (req, res, next) {
  const { type_ids } = req.body; // Expecting an array of tag IDs

  if (!Array.isArray(type_ids) || type_ids.length === 0) {
    return res.status(400).json({ error: "Tag_ids must be a non-empty array" });
  }

  const placeholders = type_ids.map(() => "?").join(","); // Create placeholders for the query
  const query = `DELETE FROM typenovel WHERE id_type IN (${placeholders})`;

  connection.query(query, type_ids, function (err, results) {
    if (err) {
      return next(err);
    }
    res.json(results);
  });
});
app.listen(port, () => {
  console.log(`server api-novel app listening on port ${port}`);
});
