import { Component, OnInit } from '@angular/core';
import { CallService } from 'src/app/services/call.service';
import { AuthService } from '../../services/auth.service';
import Peer from 'peerjs';
import { DataService } from 'src/app/services/data.service';
import { User } from 'src/app/models/user.model';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VideoCallComponent } from './components/video-call/video-call.component';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  peer: Peer;
  users: User[] = [];
  chatUser: User;
  constructor(
    public auth: AuthService,
    public callService: CallService,
    public data: DataService,
    private diaLog: MatDialog
  ) {
    this.peer = new Peer();
    this.peer.on('open', (id) => console.log(id));
  }

  ngOnInit(): void {
    this.data.getAllUser().subscribe((data) => {
      this.users = data;
    });
    // this.peer.on('call', (call) => {
    //   alert('incoming call');
    //   const idLocalVideo = <HTMLVideoElement>(
    //     document.getElementById('localStream')
    //   );
    //   const idRemoteVideo = <HTMLVideoElement>(
    //     document.getElementById('remotestream')
    //   );
    //   this.call.openStream().then((stream) => {
    //     call.answer(stream);
    //     this.call.playStream(idLocalVideo, stream);
    //     call.on('stream', (remoteStream) =>
    //       this.call.playStream(idRemoteVideo, remoteStream)
    //     );
    //   });
    // });
  }
  public startCall() {
    const id = <any>document.getElementById('remoteId');
    const idLocalVideo = <HTMLVideoElement>(
      document.getElementById('localStream')
    );
    const idRemoteVideo = <HTMLVideoElement>(
      document.getElementById('remotestream')
    );
    this.callService.openStream().then((stream) => {
      this.callService.playStream(idLocalVideo, stream);
      const call = this.peer.call(id, stream);
      call.on('stream', (remoteStream) =>
        this.callService.playStream(idRemoteVideo, remoteStream)
      );
    });
  }

  public onclickUser(uid: any) {
    this.data.getUser(uid);
    this.chatUser = this.data.user;
    console.log(this.chatUser);
  }
  // public answerCall() {
  //   this.peer.on('call', (call) => {
  //     const idLocalVideo = <HTMLVideoElement>(
  //       document.getElementById('localStream')
  //     );
  //     const idRemoteVideo = <HTMLVideoElement>(
  //       document.getElementById('remotestream')
  //     );
  //     this.call.openStream().then((stream) => {
  //       call.answer(stream);
  //       this.call.playStream(idLocalVideo, stream);
  //       call.on('stream', (remoteStream) =>
  //         this.call.playStream(idRemoteVideo, remoteStream)
  //       );
  //     });
  //   });
  // }
  openWindow() {
    this.diaLog.open(VideoCallComponent, {
      data: {
        remoteId: <any>document.getElementById('remoteId'),
      },
    });
  }
}
