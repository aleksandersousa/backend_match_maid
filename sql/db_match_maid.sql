CREATE DATABASE IF NOT EXISTS db_match_maid /*!40100 DEFAULT CHARACTER SET latin1 */;

USE db_match_maid;

CREATE TABLE IF NOT EXISTS client (
  id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
  cpf VARCHAR(15) UNIQUE NOT NULL,
  name VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL,
  password TEXT NOT NULL,
  phoneNumber VARCHAR(17),
  birthDate DATE,
  image TEXT
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS maid (
  id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
  cpf VARCHAR(15) UNIQUE NOT NULL,
  name VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL,
  password TEXT NOT NULL,
  phoneNumber VARCHAR(17) NOT NULL,
  birthDate DATE NOT NULL,
  status BOOLEAN DEFAULT 0,
  bibliography TINYTEXT NOT NULL,
  pricePerHour DECIMAL (65, 2) NOT NULL,
  numberOfVisits BIGINT DEFAULT 0,
  image TEXT
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS client_location (
  clientCpf VARCHAR(15) UNIQUE NOT NULL PRIMARY KEY,
  longitude DECIMAL(11, 8) NOT NULL,
  latitude DECIMAL(10, 8) NOT NULL,
  street VARCHAR(150) NOT NULL,
  houseNumber VARCHAR(20) NOT NULL,
  complement VARCHAR(50) NOT NULL,
  neighborhood VARCHAR(50) NOT NULL,
  city VARCHAR(50) NOT NULL,
  cep VARCHAR(10) NOT NULL,
  uf CHAR(2),
  INDEX(clientCpf)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS maid_location (
  maidCpf VARCHAR(15) UNIQUE NOT NULL PRIMARY KEY,
  longitude DECIMAL(11, 8) NOT NULL,
  latitude DECIMAL(10, 8) NOT NULL,
  street VARCHAR(150) NOT NULL,
  houseNumber VARCHAR(20) NOT NULL,
  complement VARCHAR(50) NOT NULL,
  neighborhood VARCHAR(50) NOT NULL,
  city VARCHAR(50) NOT NULL,
  cep VARCHAR(10) NOT NULL,
  uf CHAR(2),
  INDEX(maidCpf)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


CREATE TABLE IF NOT EXISTS disponible_days (
  maidCpf VARCHAR(15) UNIQUE NOT NULL PRIMARY KEY,
  monday BOOLEAN DEFAULT 0,
  tuesday BOOLEAN DEFAULT 0,
  wednesday BOOLEAN DEFAULT 0,
  thursday BOOLEAN DEFAULT 0,
  friday BOOLEAN DEFAULT 0,
  saturday BOOLEAN DEFAULT 0,
  sunday BOOLEAN DEFAULT 0,
  INDEX(maidCpf)
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS disponible_period (
  maidCpf VARCHAR(15) UNIQUE NOT NULL PRIMARY KEY,
  morning BOOLEAN DEFAULT 0,
  afternoon BOOLEAN DEFAULT 0,
  night BOOLEAN DEFAULT 0,
  INDEX(maidCpf)
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS services (
  maidCpf VARCHAR(15) UNIQUE NOT NULL PRIMARY KEY,
  nanny BOOLEAN DEFAULT 0,
  careHouse BOOLEAN DEFAULT 0,
  cleanHouse BOOLEAN DEFAULT 0,
  ironClothes BOOLEAN DEFAULT 0,
  washClothes BOOLEAN DEFAULT 0,
  washDishes BOOLEAN DEFAULT 0,
  cook BOOLEAN DEFAULT 0,
  INDEX(maidCpf)
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS premium_state (
  maidCpf VARCHAR(15) UNIQUE NOT NULL PRIMARY KEY,
  status BOOLEAN NOT NULL,
  dateTimeStart DATETIME NOT NULL,
  dateTimeEnd DATETIME NOT NULL,
  INDEX(maidCpf)
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS rating (
  maidCpf VARCHAR(15) NOT NULL,
  stars DECIMAL(10, 2) NOT NULL,
  goodWork BOOLEAN DEFAULT 0,
  onTime BOOLEAN DEFAULT 0,
  arrivedOnTime BOOLEAN DEFAULT 0
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS interactions (
  clientId INT NOT NULL,
  maidId INT NOT NULL,
  accessTime DATETIME NOT NULL,
  PRIMARY KEY (accessTime)
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

ALTER TABLE client_location ADD FOREIGN KEY (clientCpf) REFERENCES client (cpf);
ALTER TABLE maid_location ADD FOREIGN KEY (maidCpf) REFERENCES maid (cpf);
ALTER TABLE disponible_days ADD FOREIGN KEY (maidCpf) REFERENCES maid (cpf);
ALTER TABLE disponible_period ADD FOREIGN KEY (maidCpf) REFERENCES maid (cpf);
ALTER TABLE services ADD FOREIGN KEY (maidCpf) REFERENCES maid (cpf);
ALTER TABLE premium_state ADD FOREIGN KEY (maidCpf) REFERENCES maid (cpf);
