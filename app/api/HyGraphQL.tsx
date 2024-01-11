import { request, gql } from 'graphql-request'

const url = "https://api-ca-central-1.hygraph.com/v2/clr67gp3g17w001w07zfg79bd/master"
// const url1 = "https://api-ca-central-1.hygraph.com/v2/clr6e1u2o0ak101w55s3ldk8k/master"

const getSliders = async () => {
  const query = gql`
  query getSliders {
    sliders {
      id
      name
      image {
        url
      }
    }
  }
`
  const result = await request(url, query)
  return result
}

const getCategory = async () => {
  const query = gql`
  query getCategory {
    categories {
      id
      name
      icon {
        url
      }
    }
  }`
  const result = await request(url, query)
  return result
}

const getBusinessList = async () => {
  const query = gql`
  query getBusinessList {
    businessLists {
      id
      name
      email
      contactPerson
      category {
        name
      }
      address
      abount
      images {
        url
      }
    }
  }`
  const result = await request(url, query)
  return result
}

const getBusinessListByCategory = async (category: any) => {
  const query = gql`
  query getBusinessListByCategory {
    businessLists(where: {category: {name: "`+ category + `"}}) {
      id
      name
      email
      contactPerson
      category {
        name
      }
      address
      abount
      images {
        url
      }
    }
  }`
  const result = await request(url, query)
  return result
}

const createBooking = async (booking: any) => {
  const mutationQuery = gql`
  mutation createBooking {
    createBooking(
      data: {
        userName: "`+ booking.userName + `", 
        userEmail: "`+ booking.userEmail + `", 
        date: "`+ booking.date + `", 
        time: "`+ booking.time + `", 
        bookingStatus: Booked, 
        note: "`+ booking.note +`",
        businessList: {connect: {id: "`+ booking.businessid + `"}}}
    ) {
      id
    }
    publishManyBookings(to: PUBLISHED) {
      count
    }
  }`
  const result = await request(url, mutationQuery)
  return result
}

const getUserBookings = async (email: any) => {
  const query = gql`
  query getUserBookings {
    bookings(orderBy: updatedAt_DESC, where: {userEmail: "`+ email + `"}) {
      userName
      userEmail
      date
      time
      id
      bookingStatus
      businessList {
        address
        contactPerson
        email
        id
        name
        abount
        images {
          url
        }
        abount
        category {
        name
        }
      }
    }
  }`
  const result = await request(url, query)
  return result
}

export {
  getSliders,
  getCategory,
  getBusinessList,
  getBusinessListByCategory,
  createBooking,
  getUserBookings
}