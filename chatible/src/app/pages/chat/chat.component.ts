import { Component, OnInit } from '@angular/core';
import { CallService } from 'src/app/services/call.service';
import { AuthService } from '../../services/auth.service';
import Peer from 'peerjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  public peer: Peer;
  constructor(public auth: AuthService, public call: CallService) {
    this.peer = new Peer();
    this.peer.on('open', (id) => console.log(id));
  }

  ngOnInit(): void {
    this.peer.on('call', (call) => {
      alert('incoming call');
      const idLocalVideo = <HTMLVideoElement>(
        document.getElementById('localStream')
      );
      const idRemoteVideo = <HTMLVideoElement>(
        document.getElementById('remotestream')
      );
      this.call.openStream().then((stream) => {
        call.answer(stream);
        this.call.playStream(idLocalVideo, stream);
        call.on('stream', (remoteStream) =>
          this.call.playStream(idRemoteVideo, remoteStream)
        );
      });
    });
  }
  public startCall() {
    const id = <any>document.getElementById('remoteId');
    const idLocalVideo = <HTMLVideoElement>(
      document.getElementById('localStream')
    );
    const idRemoteVideo = <HTMLVideoElement>(
      document.getElementById('remotestream')
    );
    this.call.openStream().then((stream) => {
      this.call.playStream(idLocalVideo, stream);
      const call = this.peer.call(id, stream);
      call.on('stream', (remoteStream) =>
        this.call.playStream(idRemoteVideo, remoteStream)
      );
    });
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
}
