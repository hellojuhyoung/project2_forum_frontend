export function ImagesFromText(content: string) {
  // Regular expression to find images in markdown ![](...)
  const imageRegex = /!\[\]\((data:image\/[a-zA-Z]+;base64,[^)]+)\)/g;
  const images: string[] = [];

  // Replace image markdown with empty string and collect images
  const text = content.replace(imageRegex, (match, contentImage) => {
    images.push(contentImage);
    return "";
  });

  // Trim the text to remove extra spaces/newlines after removing images
  return { text: text.trim(), images };
}

// converts image url from the editor to base64 style string
export async function convertImageUrlsToBase64(
  content: string,
  imagePaths: string[],
  apiUrl: string
): Promise<string> {
  const imagesMarkdown = await Promise.all(
    imagePaths.map(async (path) => {
      try {
        const imageUrl = `${apiUrl}${path}`;
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const base64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });

        return `![](${base64})`;
      } catch (err) {
        console.error("Failed to convert image:", err);
        return ""; // or fallback to the original URL
      }
    })
  );

  return content + "\n\n" + imagesMarkdown.join("\n\n");
}

export function cleanContent(content: string): string {
  return content
    .split("\n")
    .filter((line) => {
      const trimmed = line.trim();
      return (
        trimmed !== "" &&
        trimmed !== "<br>" &&
        trimmed !== "![]()" &&
        trimmed !== "<p><br></p>"
      );
    })
    .join("\n")
    .trim();
}
