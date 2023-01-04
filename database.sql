CREATE TABLE DORMITORY
(
  DName VARCHAR(20) NOT NULL,
  Fee INT NOT NULL,
  DCapacity INT NOT NULL,
  PRIMARY KEY (DName)
);

CREATE TABLE ANNOUNCEMENT
(
  AnnounceNumber INT NOT NULL AUTO_INCREMENT,
  AnnounceContent VARCHAR(500) NOT NULL,
  PRIMARY KEY (AnnounceNumber)
);

CREATE TABLE ROOM
(
  RoomNumber CHAR(3) NOT NULL, -- XXX
  RCapacity INT NOT NULL,
  DName VARCHAR(20) NOT NULL,
  PRIMARY KEY (RoomNumber, DName),
  FOREIGN KEY (DName) REFERENCES DORMITORY(DName)
  ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE FACILITY
(
  DName VARCHAR(20) NOT NULL,
  RoomNumber CHAR(3) NOT NULL,
  FName VARCHAR(20) NOT NULL,
  FQuantity INT NULL,
  PRIMARY KEY (DName, RoomNumber, FName),
  FOREIGN KEY (RoomNumber, DName) REFERENCES ROOM(RoomNumber, DName)
  ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE USER
(
  UType VARCHAR(15) NOT NULL,
  UID VARCHAR(10) NOT NULL,
  UPassword VARCHAR(200) NOT NULL,
  UName VARCHAR(30) NOT NULL,
  PRIMARY KEY (UID)
);

CREATE TABLE HOUSEMASTER
(
  HEmail VARCHAR(50) NOT NULL,
  HPhoneNumber CHAR(10) NULL,
  HSSN CHAR(10) NOT NULL,
  DName VARCHAR(20) NULL,
  PRIMARY KEY (HSSN),
  FOREIGN KEY (HSSN) REFERENCES USER(UID)
  ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (DName) REFERENCES DORMITORY(DName)
  ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE STUDENT
(
  SEmail VARCHAR(50) NOT NULL,
  SPhoneNumber CHAR(10) NULL,
  SSex VARCHAR(10) NOT NULL,
  SAcademicYear CHAR(3) NOT NULL DEFAULT 111,
  SDepartment VARCHAR(30) NOT NULL,
  StuID CHAR(8) NOT NULL,
  PRIMARY KEY (StuID),
  FOREIGN KEY (StuID) REFERENCES USER(UID)
  ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE ADMIN
(
  ASSN CHAR(10) NOT NULL,
  PRIMARY KEY (ASSN),
  FOREIGN KEY (ASSN) REFERENCES USER(UID)
  ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE NON_BOARDER
(
  StuID CHAR(8) NOT NULL,
  PRIMARY KEY (StuID),
  FOREIGN KEY (StuID) REFERENCES STUDENT(StuID)
  ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE BOARDER
(
  StuID CHAR(8) NOT NULL,
  RoomNumber CHAR(3) NULL,
  DName VARCHAR(20) NULL,
  ASSN CHAR(10) NOT NULL,
  PRIMARY KEY (StuID),
  FOREIGN KEY (StuID) REFERENCES STUDENT(StuID)
  ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (RoomNumber, DName) REFERENCES ROOM(RoomNumber, DName)
  ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE HAN_Manage
(
  `DateTime` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  AnnounceNumber INT NOT NULL,
  HSSN CHAR(10) NOT NULL,
  PRIMARY KEY (AnnounceNumber, HSSN),
  FOREIGN KEY (AnnounceNumber) REFERENCES ANNOUNCEMENT(AnnounceNumber)
  ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (HSSN) REFERENCES HOUSEMASTER(HSSN)
  ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE AD_Manage
(
  ASSN CHAR(10) NOT NULL,
  DName VARCHAR(20) NOT NULL,
  PRIMARY KEY (ASSN, DName),
  FOREIGN KEY (ASSN) REFERENCES ADMIN(ASSN)
  ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (DName) REFERENCES DORMITORY(DName)
  ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE AS_Manage
(
  ASSN CHAR(10) NOT NULL,
  StuID CHAR(8) NOT NULL,
  PRIMARY KEY (ASSN, StuID),
  FOREIGN KEY (ASSN) REFERENCES ADMIN(ASSN)
  ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (StuID) REFERENCES BOARDER(StuID)
  ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE AAN_Manage
(
  `DateTime` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  ASSN CHAR(10) NOT NULL,
  AnnounceNumber INT NOT NULL,
  PRIMARY KEY (ASSN, AnnounceNumber),
  FOREIGN KEY (ASSN) REFERENCES ADMIN(ASSN)
  ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (AnnounceNumber) REFERENCES ANNOUNCEMENT(AnnounceNumber)
  ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE VIOLATION
(
  StuID CHAR(8) NOT NULL,
  VNumber INT NOT NULL auto_increment,
  VContent VARCHAR(200) NOT NULL, 
  `DATE` DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (StuID, VNumber),
  FOREIGN KEY (StuID) REFERENCES BOARDER(StuID)
  ON DELETE CASCADE ON UPDATE CASCADE
)ENGINE=MyISAM;

CREATE TABLE APPLYCATION
(
  ApplyNumber INT NOT NULL AUTO_INCREMENT,
  ApplyAcademicYear CHAR(3) NOT NULL DEFAULT 111,
  ApplySemester VARCHAR(8) NOT NULL,
  `Date` DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  Approved VARCHAR(10) NOT NULL, 
  Paid CHAR(6) NOT NULL, -- 已付款未付款
  DName VARCHAR(20) NOT NULL, 
  StuID CHAR(8) NOT NULL,
  ASSN CHAR(10) NULL,
  PRIMARY KEY (ApplyNumber, StuID),
  FOREIGN KEY (StuID) REFERENCES STUDENT(StuID)
  ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (DName) REFERENCES DORMITORY(DName)
  ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (ASSN) REFERENCES ADMIN(ASSN)
  ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE MESSAGE
(
  MNumber INT NOT NULL AUTO_INCREMENT,
  MTitle VARCHAR(100) NOT NULL,
  MContent VARCHAR(400) NOT NULL,
  `Datetime` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  StuID CHAR(8) NOT NULL,
  PRIMARY KEY (MNumber),
  FOREIGN KEY (StuID) REFERENCES STUDENT(StuID)
  ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE HV_Manage
(
  StuID CHAR(8) NOT NULL,
  VNumber INT NOT NULL,
  HSSN CHAR(10) NOT NULL,
  PRIMARY KEY (StuID, VNumber, HSSN),
  FOREIGN KEY (HSSN) REFERENCES HOUSEMASTER(HSSN)
  ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (VNumber, StuID) REFERENCES VIOLATION(VNumber, StuID)
  ON DELETE CASCADE ON UPDATE CASCADE
)ENGINE=MyISAM;

CREATE TABLE HM_Manage
(
  MNumber INT NOT NULL,
  HSSN CHAR(10) NOT NULL,
  PRIMARY KEY (MNumber, HSSN),
  FOREIGN KEY (MNumber) REFERENCES MESSAGE(MNumber)
  ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (HSSN) REFERENCES HOUSEMASTER(HSSN)
  ON DELETE CASCADE ON UPDATE CASCADE
);