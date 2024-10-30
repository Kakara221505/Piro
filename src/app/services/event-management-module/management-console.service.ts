import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ManagementConsoleService {
  token: any;
  httpOptions: any;
  httpOptionsPost: any;
  httpOptionsPort: any;
  metaMaskAddress: { headers: HttpHeaders; };

  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('X-Custom-Token');

    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Custom-Token': this.token
      })
    };
    this.metaMaskAddress = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-API-Key': '8LwyFw0kWccmwB84bY25EVreQmIC36yZTdjGIawZm4ESTpqNcUVBW5IzLEmWozos'
      })
    };
  }


  getMetaMoralishAddress(contractaAddress:any,chain:any){
    return this.http.get(`https://deep-index.moralis.io/api/v2/nft/${contractaAddress}/metadata?chain=${chain}`,
      this.metaMaskAddress
    );
  }

  

  getAllEventsConsole(eventStatus: string, pageNo: number, pageSize: number) {
    return this.http.get(
      environment.apiUrlEvent + `user/events/OrganizerOrHost?eventStatus=${eventStatus}&pageNo=${pageNo}&pageSize=${pageSize}`,
      this.httpOptions
    );
  }
  getEvents(eventId: any) {
    return this.http.get(environment.apiUrlEvent + `events/get/${eventId}`, this.httpOptions);
  }

  getVenueImageId(id: any) {
    return this.http.get(environment.apiUrlSpace + `user/venue/get/${id}`, this.httpOptions);
  }

  getEventCategory() {
    return this.http.get(environment.apiUrlEvent + 'events/getAllEventCategories', this.httpOptions);
  }

  getEventType() {
    return this.http.get(environment.apiUrlEvent + 'events/getAllEventTypes', this.httpOptions);
  }

  getAllEventStatus() {
    return this.http.get(environment.apiUrlEvent + 'events/getAllEventStatus', this.httpOptions);
  }

  addEvents(events: any) {
    return this.http.post(environment.apiUrlEvent + 'events/create/event', events, this.httpOptions);
  }

  updateEvents(events: any) {
    return this.http.put(environment.apiUrlEvent + 'events/update', events, this.httpOptions);
  }

  updateSpace(events: any) {
    return this.http.put(environment.apiUrlEvent + 'events/update', events, this.httpOptions);
  }

  delteBannerById(eventBannerId: any) {
    return this.http.delete(environment.apiUrlEvent + `events/delete/eventBanner/${eventBannerId}`, this.httpOptions);
  }

  //choose space API
  getSpace() {
    return this.http.get(environment.apiUrlSpace + 'user/venue/all', this.httpOptions);
  }

  getVenueId(id: any) {
    return this.http.get(environment.apiUrlSpace + `user/venue/get/${id}`, this.httpOptions);
  }

  //access management
  AccesType(access: any) {
    return this.http.post(environment.apiUrlEvent + 'events/add/acessType', access, this.httpOptions);
  }

  setAccessType(body: any) {
    return this.http.post(environment.apiUrlEvent + 'events/setAcessTypeForEvent', body, this.httpOptions);
  }
  setNftType(body: any) {
    return this.http.post(environment.apiUrlEvent + 'events/add/accessType/nftBased', body, this.httpOptions);
  }

  openAccess(eventId: any, body: any) {
    return this.http.post(environment.apiUrlEvent + `events/add/acessType/openAcess/${eventId}`, body, this.httpOptions);
  }

  addPasswordProtected(passwords: any) {
    return this.http.post(environment.apiUrlEvent + 'events/add/acessType/passwordProtected', passwords, this.httpOptions);
  }

  getEmailDomains(eventId: any) {
    return this.http.get(environment.apiUrlEvent + `events/get/eventWhiteListDomains/${eventId}`, this.httpOptions);
  }
  addEmailOtp(otps: any) {
    return this.http.post(environment.apiUrlEvent + 'events/add/acessType/EmailAndOtp', otps, this.httpOptions);
  }

  deleteDomains(eventWhiteListDomainId: any) {
    return this.http.delete(
      environment.apiUrlEvent + `events/delete/eventWhiteListDomain/${eventWhiteListDomainId}`,
      this.httpOptions
    );
  }

  getVisibilty() {
    return this.http.get(environment.apiUrlEvent + 'events/get/eventTicketVisibilityList', this.httpOptions);
  }
  addRegistration(registration: any) {
    return this.http.post(environment.apiUrlEvent + 'events/add/acessType/registrationBased', registration, this.httpOptions);
  }

  getTickets(eventId: any) {
    return this.http.get(environment.apiUrlEvent + `events/get/eventTicketList/${eventId}`, this.httpOptions);
  }

  deleteTickiets(eventTicketId: any) {
    return this.http.delete(environment.apiUrlEvent + `events/delete/eventTicket/${eventTicketId}`, this.httpOptions);
  }

  //access management end

  //role management
  addRoleManagement(roles: any) {
    return this.http.post(environment.apiUrlEvent + 'user/events/create', roles, this.httpOptions);
  }

  getSpeakerManagementList(pageNo: number, pageSize: number, eventId: any) {
    return this.http.get(
      environment.apiUrlEvent +
        `user/events/getUsersListByRoleAndInvitationType?pageNo=${pageNo}&pageSize=${pageSize}&eventId=${eventId}&eventRole=SPEAKER&invitationType=INVITED`,
      this.httpOptions
    );
  }

  getRoleManagement(pageNo: number, pageSize: number, eventId: any) {
    return this.http.get(
      environment.apiUrlEvent +
        `user/events/getUsersListByRoleAndInvitationType?pageNo=${pageNo}&pageSize=${pageSize}&eventId=${eventId}&eventRole=ORGANIZER&invitationType=INVITED`,
      this.httpOptions
    );
  }

  updateSpeaker(speaker: any) {
    return this.http.put(environment.apiUrlEvent + 'user/events/update', speaker, this.httpOptions);
  }

  //add invites
  addInvitees(roles: any) {
    return this.http.post(environment.apiUrlEvent + 'user/events/create', roles, this.httpOptions);
  }

  getAttendeeManagement(pageNo: number, pageSize: number, eventId: any) {
    return this.http.get(
      environment.apiUrlEvent +
        `user/events/getUsersListByRoleAndInvitationType?pageNo=${pageNo}&pageSize=${pageSize}&eventId=${eventId}&eventRole=ATTENDEE&invitationType=INVITED`,
      this.httpOptions
    );
  }

  deleteAttendeManagement(userEventId: any) {
    return this.http.delete(environment.apiUrlEvent + `user/events/deleteUserEvent/${userEventId}`, this.httpOptions);
  }

  approveAttendeManagement(body:any) {
    return this.http.post(environment.apiUrlEvent + `user/events/approve/reject`,body, this.httpOptions);
  }

  deleteRoleManagement(userEventId: any) {
    return this.http.delete(environment.apiUrlEvent + `user/events/deleteUserEvent/${userEventId}`, this.httpOptions);
  }

  getReminderList() {
    return this.http.get(environment.apiUrlEvent + 'events/get/eventReminderList', this.httpOptions);
  }

  addorUpdateReminder(body: any) {
    return this.http.post(environment.apiUrlEvent + 'events/addOrUpdate/eventReminder', body, this.httpOptions);
  }

  //update organizer
  updateOrganizer(roles: any) {
    return this.http.put(environment.apiUrlEvent + 'user/events/update', roles, this.httpOptions);
  }

  //bulkCv
  uploadExcelFile(formData: any, eventId: any) {
    this.httpOptionsPost = {
      headers: new HttpHeaders({
        'X-Custom-Token': this.token
      })
    };

    return this.http.post(environment.apiUrlEvent + `user/events/bulk/update/${eventId}`, formData, this.httpOptionsPost);
  }

  //Manage-space-banner

  getSpaceList(id: any) {
    return this.http.get(environment.apiUrlSpace + `/user/venue/get/${id}`, this.httpOptions);
  }

  getBannerId(eventId: any) {
    return this.http.get(environment.apiUrlEvent + `events/getAllListOfBannersByEvent/${eventId}`, this.httpOptions);
  }
  uploadBanner(formData: any) {
    return this.http.post(
      environment.apiUrlEvent + 'events/addOrUpdate/eventBanneruser/events/update',
      formData,
      this.httpOptions
    );
  }

  adBanner(formData: any) {
    this.httpOptionsPost = {
      headers: new HttpHeaders({
        'X-Custom-Token': this.token
      })
    };
    return this.http.post(environment.apiUrlEvent + 'events/addOrUpdate/eventBanner', formData, this.httpOptionsPost);
  }

  //event session api's
  addSessions(session: any) {
    return this.http.post(environment.apiUrlEvent + 'user/events/addUserSession', session, this.httpOptions);
  }

  getSession(eventId: any) {
    return this.http.get(environment.apiUrlEvent + `user/events/get/userStage/${eventId}`, this.httpOptions);
  }

  getSesionById(userSessionId: any) {
    return this.http.get(
      environment.apiUrlEvent + `/user/events/get/userSessions/getBySession/${userSessionId}`,
      this.httpOptions
    );
  }

  updateSession(session: any) {
    return this.http.put(environment.apiUrlEvent + 'user/events/updateUserSession', session, this.httpOptions);
  }

  deleteSession(sessionId: any) {
    return this.http.delete(environment.apiUrlEvent + `user/events/delete/UserSessions/${sessionId}`, this.httpOptions);
  }

  getTimeZoneList() {
    return this.http.get('../../../assets/timezone.json');
  }

  getEventUserId(userEventId: any) {
    return this.http.get(environment.apiUrlEvent + `user/events/get/${userEventId} `, this.httpOptions);
  }

  //get timezone lists
  getTimeZone() {
    return this.http.get(environment.apiUrlEvent + 'events/getAllTimeZoneList', this.httpOptions);
  }

  getEventRequestList(page: any, pageSize: any, requestStatus: any, eventId: any) {
    return this.http.get(
      environment.apiUrlEvent +
        `user/events/eventRequest?page=${page}&pageSize=${pageSize}&requestStatus=${requestStatus}&eventId=${eventId}`,
      this.httpOptions
    );
  }
  getEarlyAccess(){
    const httpOptionsPost = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-custom-token': this.token,
      }),
    };
    return this.http.get(
      environment.apiUrlUser+'user/getEarlyAccessQuestion',
      httpOptionsPost
    );
  }
  getEarlyAccessApplied(){
    const httpOptionsPost = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-custom-token': this.token,
      }),
    };
    return this.http.get(
      environment.apiUrlUser+'user/get/early/status',
      httpOptionsPost
    );
  }

  postEarlyAccess(body:any){
    const httpOptionsPost = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-custom-token': this.token,
      }),
    };
    return this.http.post(
      environment.apiUrlUser + 'user/requestEarlyAccess',
      body,
      httpOptionsPost
    );
  }


}
