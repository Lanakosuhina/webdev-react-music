export type DataTrack = {
  album: string,
  author: string,
  duration_in_seconds: number,
  genre: string,
  id: number,
  logo: null,
  name: string,
  release_date: string,
  stared_user: StaredUser[],
  track_file: string,
}

export interface StaredUser {
  email: string,
  first_name: string,
  id: number,
  last_name: string,
  username: string,
}

export async function getData(): Promise<DataTrack[]> {
  return await fetch("https://skypro-music-api.skyeng.tech/catalog/track/all/", {
    method: "GET",
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("Ошибка при получении данных")
      }
      return response.json()

    })
    .catch((error: Error) => {
      alert(error.message)
    })

}

export async function getAllFavourites({ accessToken }: { accessToken: string }) {
  const response = await fetch("https://skypro-music-api.skyeng.tech/catalog/track/favorite/all/", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  const responseData = response.json()

  if (!response.ok) {
    throw new Error(JSON.stringify(responseData))
  }
  return responseData;

}

export async function likeTrack({ accessToken, id }: {
  accessToken: string,
  id: string
}) {
  const response = await fetch(`https://skypro-music-api.skyeng.tech/catalog/track/${id}/favorite/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  const responseData = await response.json()

  if (!response.ok) {
    throw new Error(JSON.stringify(responseData))
  }
  return accessToken;

}

export async function dislikeTrack({ accessToken, id }: {
  accessToken: string,
  id: string
}) {
  const response = await fetch(`https://skypro-music-api.skyeng.tech/catalog/track/${id}/favorite/`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  const responseData = await response.json()

  if (!response.ok) {
    throw new Error(JSON.stringify(responseData))
  }
  return accessToken;

}
