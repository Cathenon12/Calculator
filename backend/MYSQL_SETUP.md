# 🗄️ Configuration MySQL - Calculatrice Pro

Guide complet pour la configuration et utilisation de MySQL avec le projet.

## ✅ Installation complétée

### Ce qui a été installé:
- ✅ MySQL Server 8.0.45
- ✅ Base de données `calculatrice_db`
- ✅ Utilisateur MySQL: `calc_user`
- ✅ 5 tables principales
- ✅ Package npm `mysql2` pour Node.js

---

## 🗄️ Structure de la base de données

### Table `history`
Stocke l'historique de tous les calculs.

```sql
Colonnes:
- id: INT PRIMARY KEY
- user_id: INT (pour authentification future)
- expression: VARCHAR(500) - L'expression calculée
- result: VARCHAR(255) - Le résultat
- calculation_type: ENUM (basic, scientific, financial, statistical)
- execution_time: FLOAT - Temps d'exécution en ms
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

### Table `statistics_data`
Stocke les analyses statistiques sauvegardées.

```sql
Colonnes:
- id: INT PRIMARY KEY
- user_id: INT
- name: VARCHAR(255) - Nom de l'analyse
- data_points: JSON - Tableau des nombres
- mean: DECIMAL - Moyenne
- median: DECIMAL - Médiane
- mode: DECIMAL - Mode
- std_dev: DECIMAL - Écart-type
- min_value: DECIMAL - Minimum
- max_value: DECIMAL - Maximum
- created_at: TIMESTAMP
```

### Table `financial_calculations`
Stocke les calculs financiers sauvegardés.

```sql
Colonnes:
- id: INT PRIMARY KEY
- user_id: INT
- calculation_type: ENUM (compound_interest, mortgage, vat, investment)
- name: VARCHAR(255)
- input_data: JSON - Paramètres d'entrée
- result_data: JSON - Résultats du calcul
- created_at: TIMESTAMP
```

### Table `saved_expressions`
Stocke les expressions personnalisées.

```sql
Colonnes:
- id: INT PRIMARY KEY
- user_id: INT
- name: VARCHAR(255) - Nom de l'expression
- description: TEXT
- expression: VARCHAR(500) - L'expression (ex: "2*pi*r")
- category: ENUM (math, science, finance, stats)
- created_at: TIMESTAMP
```

### Table `users`
Pour l'authentification future.

```sql
Colonnes:
- id: INT PRIMARY KEY
- username: VARCHAR(255) UNIQUE
- email: VARCHAR(255) UNIQUE
- password_hash: VARCHAR(255)
- theme: ENUM (light, dark)
- language: VARCHAR(10)
- preferences: JSON
- created_at: TIMESTAMP
```

---

## 🔧 Configuration

### Identifiants MySQL
```
Host: localhost
Port: 3306 (défaut)
User: calc_user
Password: calc_password_123
Database: calculatrice_db
```

### Fichier .env
```env
PORT=5000
NODE_ENV=development

# MySQL Configuration
DB_HOST=localhost
DB_USER=calc_user
DB_PASSWORD=calc_password_123
DB_NAME=calculatrice_db
```

⚠️ **En production**, changez le mot de passe!

---

## 📡 Endpoints de la base de données

### Historique
```
GET  /api/database/history              - Récupérer l'historique
POST /api/database/history              - Ajouter un calcul à l'historique
DELETE /api/database/history            - Effacer tout l'historique
```

**Exemple POST:**
```json
{
  "expression": "2+3*4",
  "result": 14,
  "calculation_type": "basic"
}
```

### Statistiques
```
GET  /api/database/statistics           - Récupérer les analyses sauvegardées
POST /api/database/statistics           - Sauvegarder une analyse
```

**Exemple POST:**
```json
{
  "name": "Analyse des ventes Q1",
  "data_points": [100, 150, 200, 180, 220],
  "mean": 170,
  "median": 180,
  "mode": 100,
  "std_dev": 42.5,
  "min_value": 100,
  "max_value": 220
}
```

### Calculatrice Financière
```
GET  /api/database/financial            - Récupérer les calculs sauvegardés
POST /api/database/financial            - Sauvegarder un calcul
```

**Exemple POST:**
```json
{
  "calculation_type": "compound_interest",
  "name": "Investissement 2024",
  "input_data": {
    "principal": 1000,
    "rate": 5,
    "years": 10
  },
  "result_data": {
    "amount": 1628.89,
    "interest": 628.89
  }
}
```

### Expressions
```
GET  /api/database/expressions          - Récupérer les expressions sauvegardées
POST /api/database/expressions          - Sauvegarder une expression
```

**Exemple POST:**
```json
{
  "name": "Cercle: Aire",
  "expression": "pi*r^2",
  "description": "Calcul de l'aire d'un cercle",
  "category": "math"
}
```

### Statistiques de la BD
```
GET  /api/database/stats                - Nombre d'enregistrements par table
```

---

## 🚀 Commandes MySQL utiles

### Connexion à la BDD
```bash
# Connexion avec l'utilisateur calc_user
mysql -h localhost -u calc_user -p calculatrice_db
# Password: calc_password_123

# Connexion en tant que root
sudo mysql calculatrice_db
```

### Voir les données
```bash
# Voir les 10 derniers calculs
sudo mysql calculatrice_db -e "SELECT id, expression, result, created_at FROM history LIMIT 10;"

# Voir les statistiques
sudo mysql calculatrice_db -e "SELECT * FROM statistics_data;"

# Compter les enregistrements
sudo mysql calculatrice_db -e "SELECT COUNT(*) FROM history;"
```

### Maintenance
```bash
# Faire une sauvegarde
sudo mysqldump calculatrice_db > calculatrice_backup.sql

# Restaurer une sauvegarde
sudo mysql calculatrice_db < calculatrice_backup.sql

# Optimiser les tables
sudo mysql calculatrice_db -e "OPTIMIZE TABLE history;"

# Voir la taille de la BD
sudo mysql -e "SELECT table_schema, 
  ROUND(SUM(data_length + index_length) / 1024 / 1024, 2) AS size_mb 
FROM information_schema.tables 
WHERE table_schema = 'calculatrice_db' 
GROUP BY table_schema;"
```

---

## 🐳 MySQL avec Docker (Alternative)

Si vous préférez utiliser Docker:

```bash
# Démarrer MySQL dans Docker
docker run --name mysql-calc \
  -e MYSQL_ROOT_PASSWORD=root_password \
  -e MYSQL_DATABASE=calculatrice_db \
  -e MYSQL_USER=calc_user \
  -e MYSQL_PASSWORD=calc_password_123 \
  -p 3306:3306 \
  -d mysql:8.0

# Importer le schéma
docker exec -i mysql-calc mysql -u calc_user -p calculatrice_db < database.sql
```

Ajouter au `docker-compose.yml`:
```yaml
db:
  image: mysql:8.0
  environment:
    MYSQL_ROOT_PASSWORD: root_password
    MYSQL_DATABASE: calculatrice_db
    MYSQL_USER: calc_user
    MYSQL_PASSWORD: calc_password_123
  ports:
    - "3306:3306"
  volumes:
    - mysql_data:/var/lib/mysql

volumes:
  mysql_data:
```

---

## 🔄 Sauvegarde et Restauration

### Sauvegarde régulière
```bash
#!/bin/bash
# backup.sh
BACKUP_DIR="./backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
FILENAME="calculatrice_db_$TIMESTAMP.sql"

mkdir -p $BACKUP_DIR
sudo mysqldump calculatrice_db > $BACKUP_DIR/$FILENAME
gzip $BACKUP_DIR/$FILENAME

echo "✅ Sauvegarde créée: $BACKUP_DIR/$FILENAME.gz"
```

Ajouter une tâche cron:
```bash
# Sauvegarde quotidienne à 2h du matin
0 2 * * * /path/to/backup.sh
```

### Restauration
```bash
# Depuis un fichier SQL
sudo mysql calculatrice_db < backup.sql

# Depuis un fichier compressé
gunzip -c backup.sql.gz | sudo mysql calculatrice_db
```

---

## 🔒 Sécurité

### Changer le mot de passe
```bash
# Connexion en root
sudo mysql

# Commandes:
ALTER USER 'calc_user'@'localhost' IDENTIFIED BY 'nouveau_password';
FLUSH PRIVILEGES;
EXIT;
```

### Créer un utilisateur en lecture seule
```bash
sudo mysql -e "CREATE USER 'calc_readonly'@'localhost' IDENTIFIED BY 'readonly_pass';"
sudo mysql -e "GRANT SELECT ON calculatrice_db.* TO 'calc_readonly'@'localhost';"
sudo mysql -e "FLUSH PRIVILEGES;"
```

### Modifier les permissions
```bash
# Reveoir qui peut faire quoi
sudo mysql -e "SHOW GRANTS FOR 'calc_user'@'localhost';"

# Revoquer une permission
sudo mysql -e "REVOKE DELETE ON calculatrice_db.* FROM 'calc_user'@'localhost';"

# Accorder une permission complète
sudo mysql -e "GRANT ALL PRIVILEGES ON calculatrice_db.* TO 'calc_user'@'localhost';"
```

---

## 🐛 Dépannage

### Erreur "Access denied"
```bash
# Vérifier les permissions
sudo mysql -e "SHOW GRANTS FOR 'calc_user'@'localhost';"

# Réinitialiser les permissions
sudo mysql -e "GRANT ALL PRIVILEGES ON calculatrice_db.* TO 'calc_user'@'localhost';"
sudo mysql -e "FLUSH PRIVILEGES;"
```

### MySQL s'arrête
```bash
# Relancer le service
sudo systemctl restart mysql

# Vérifier le statut
sudo systemctl status mysql

# Voir les logs
sudo tail -50 /var/log/mysql/error.log
```

### Base de données corrompue
```bash
# Réparer une table
sudo mysql calculatrice_db -e "REPAIR TABLE history;"

# Optimiser après réparation
sudo mysql calculatrice_db -e "OPTIMIZE TABLE history;"
```

### Problème de connexion Node.js
```javascript
// Vérifier la connexion dans server.js
const db = require('./config/database');

db.query('SELECT 1')
  .then(() => console.log('✅ Connexion réussie'))
  .catch(err => console.error('❌ Erreur:', err));
```

---

## 📊 Monitoring

### Voir les processus actifs
```bash
sudo mysql -e "SHOW PROCESSLIST;"
```

### Tuer une connexion
```bash
sudo mysql -e "KILL 123;" # Remplacer 123 par le PID
```

### Statistiques
```bash
# Voir l'utilisation des variables
sudo mysql -e "SHOW STATUS."

# Voir les variables de configuration
sudo mysql -e "SHOW VARIABLES LIKE '%max_connections%';"

# Augmenter max_connections
sudo mysql -e "SET GLOBAL max_connections = 100;"
```

---

## 📚 Ressources

- [MySQL Documentation](https://dev.mysql.com/doc/)
- [MySQL2 Package](https://github.com/sidorares/node-mysql2)
- [SQL Tutorials](https://www.w3schools.com/sql/)

---

**✅ MySQL est maintenant configuré et prêt à l'emploi!**
