package main

// retourner au client la taille reçue
// diviser en chunks de 10 pour la barre de téléchargement

import (
	"fmt"
	"net/http"

	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"

	"strconv"
)

// Used for the client to download a file
// The said file will be full of A's for the specified size in the parameter
func download(c *gin.Context) {
	// Retrieves the size by converting it into an int
	size, err := strconv.Atoi(c.Param("size"))
	unit := c.Param("unit")

	// Checks if there is an error or if the size is less than 0
	if err != nil || size <= 0 {
		c.String(http.StatusBadRequest, "Invalid size")
		return
	}

	chunkSize := 0

	switch unit {
	case "MB":
		chunkSize = 1000 * 1000
	case "KB":
		chunkSize = 1000
	case "GB":
		chunkSize = 1000 * 1000 * 1000
	default:
		chunkSize = 1
	}

	finalSize := size * chunkSize // Final size in MB

	origin := c.Request.Header.Get("Origin")

	fmt.Print(origin)

	// Headers for CORS policy and for the packet
	c.Header("Content-Type", "application/octet-stream")
	c.Header("Content-Length", strconv.Itoa(finalSize))
	c.Writer.Header().Set("Content-Disposition", "attachment; filename="+fmt.Sprintf("%d%s", size, unit))

	c.Writer.Header().Set("Access-Control-Allow-Origin", origin)
	c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
	c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
	c.Writer.Header().Set("Access-Control-Allow-Methods", "GET")

	// Creating the slice and filling it with A's
	data := make([]byte, chunkSize)
	for i := range data {
		data[i] = 'A'
	}

	writer := c.Writer
	for written := 0; written < finalSize; written += chunkSize {
		writer.Write(data)
		writer.Flush()
	}
}

// Used for the client to upload a file, it'll print the name of the file
func upload(c *gin.Context) {

	_, header, err := c.Request.FormFile("file")

	if err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON"})
	}

	if header == nil {
		return
	}

	origin := c.Request.Header.Get("Origin")

	c.Header("Access-Control-Allow-Origin", origin)
	c.Header("Access-Control-Allow-Credentials", "true")
	c.Header("Access-Control-Allow-Headers", "Content-Type, Authorization")
	c.Header("Access-Control-Allow-Methods", "POST")

	// Handle file upload logic here
	c.JSON(http.StatusOK, gin.H{"message": "File uploaded successfully"})

	size := header.Size / (1000)
	unit := ""
	switch {
	case size >= 1000*1000:
		unit = "GB"
		size = size / (1000 * 1000)
	case size >= 1000:
		unit = "MB"
		size = size / 1000
	default:
		unit = "KB"
	}

	fmt.Printf("Received a file : %s, it's size is %d %s ---- ", header.Filename, size, unit)

}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		origin := c.GetHeader("Origin")
		if origin != "" {
			c.Writer.Header().Set("Access-Control-Allow-Origin", origin)
			c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
			c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
			c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
		}

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}

func main() {
	router := gin.Default()
	router.Use(CORSMiddleware())

	router.Use(static.Serve("/", static.LocalFile("static", false)))
	router.NoRoute(func(c *gin.Context) {
		c.File("./static/index.html")
	})

	router.GET("/download/:size/:unit", download)
	router.POST("/upload", upload)

	router.Run("0.0.0.0:8080")
}
