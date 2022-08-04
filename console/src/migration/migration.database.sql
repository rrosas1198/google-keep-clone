CREATE DATABASE IF NOT EXISTS `keep` CHARSET `utf8mb4` COLLATE `utf8mb4_unicode_520_ci`;

USE `keep`;

CREATE TABLE IF NOT EXISTS `user`
(
    `userId`        INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `userFirstName` VARCHAR(255) NOT NULL,
    `userLastName`  VARCHAR(255) NOT NULL,
    `userPassword`  VARCHAR(255) NOT NULL,
    `userCreatedAt` DATETIME     NOT NULL,
    `userDeletedAt` DATETIME     NULL,
    PRIMARY KEY (`userId`)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `note`
(
    `noteId`         INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `noteTitle`      VARCHAR(255) NOT NULL,
    `noteContent`    TEXT         NULL,
    `noteBackground` VARCHAR(255) NOT NULL,
    `noteIsPinned`   TINYINT(1)   NOT NULL DEFAULT 0,
    `noteCreatedAt`  DATETIME     NOT NULL,
    `noteDeletedAt`  DATETIME     NULL,
    `userId`         INT UNSIGNED NOT NULL,
    PRIMARY KEY (`noteId`),
    FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `photo`
(
    `photoId`          INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `photoName`        VARCHAR(255) NOT NULL,
    `photoUrl`         VARCHAR(255) NOT NULL,
    `photoSize`        FLOAT        NOT NULL,
    `photoWidth`       FLOAT        NOT NULL,
    `photoHeight`      FLOAT        NOT NULL,
    `photoMimeType`    VARCHAR(255) NOT NULL,
    `photoAspectRatio` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`photoId`)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `noteXUser`
(
    `noteId` INT UNSIGNED NOT NULL,
    `userId` INT UNSIGNED NOT NULL,
    FOREIGN KEY (`noteId`) REFERENCES `note` (`noteId`) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `photoXNote`
(
    `noteId`  INT UNSIGNED NOT NULL,
    `photoId` INT UNSIGNED NOT NULL,
    FOREIGN KEY (`noteId`) REFERENCES `note` (`noteId`) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (`photoId`) REFERENCES `photo` (`photoId`) ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE = InnoDB;
