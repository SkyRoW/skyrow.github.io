import { Component, OnInit } from '@angular/core';
import { PoolsService } from '../../shared/pools/pools.service';
import { ActivatedRoute } from '@angular/router';
import { PollListTypes } from '../../shared/pools/pollListTypes';
import { stringFromHex } from '../../shared/helper';

@Component({
  selector: 'app-pools-page',
  templateUrl: './pools-page.component.html',
  styleUrls: ['./pools-page.component.scss']
})
export class PoolsPageComponent implements OnInit {

  pools = [];
  areOwnPools;

  // testPool = {
  //   id: 'nameOfThePool_The titleeee_4',
  //   voted: 12,
  //   canVote: true,
  // };

  constructor(private _poolsService: PoolsService,
              private _activatedRoute: ActivatedRoute) {

    _activatedRoute.data.subscribe(
      result => {
        switch (result.type) {
          case PollListTypes.PRIVATE_LIST : {
            _poolsService.getPrivatePolls().subscribe(
              pools => {
                this.pools = [];
                // this.result = result.stack[0];
                for (const pool of pools.stack[0].value) {
                  // alert('here');
                  this.pools.push(
                    {
                      id: stringFromHex(pool.value[0].value),
                      voted: pool.value[1].value,
                      canVote: stringFromHex(pool.value[2].value),
                    });
                  this._poolsService.actualPolls = this.pools;
                }
                this._poolsService.actualPolls = this.pools;
              }
            );
            break;
          }
          case PollListTypes.OWN_LIST: {
            _poolsService.getOwnPolls().subscribe(
              pools => {
                this.areOwnPools = true;
                this.pools = [];
                // this.result = result.stack[0];
                for (const pool of pools.stack[0].value) {
                  this.pools.push(
                    {
                      id: stringFromHex(pool.value[0].value),
                      voted: pool.value[1].value,
                      canVote: stringFromHex(pool.value[2].value),
                    });
                }
                this._poolsService.actualPolls = this.pools;
              }
            );
            break;
          }
          default: {
            break;
          }
        }
      }
    );
  }

  ngOnInit() {
  }

}
