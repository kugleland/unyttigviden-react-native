// fact card

import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import PagerView from "react-native-pager-view";

import { Fact } from "../types/fact";

import { useFactStore } from "../store/useFactStore";
import useAuthStore from "../store/auth/useAuthStore";
import { Image } from "expo-image";

// gluestack ui
import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { Icon } from "@/components/ui/icon";
import { Box } from "@/components/ui/box";
import {
  Button,
  ButtonIcon,
  ButtonText,
  ButtonSpinner,
} from "@/components/ui/button";
import { Heading, ThumbsUp, ThumbsDown } from "lucide-react-native";
import { Bookmark } from "lucide-react-native";
import { useRouter } from "expo-router";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogBody,
  AlertDialogBackdrop,
} from "@/components/ui/alert-dialog";

const FactCard = ({ fact }: { fact: Fact }) => {
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const handleClose = () => setShowAlertDialog(false);

  const user = useAuthStore((state: any) => state.user);

  //
  const [voteStatus, setVoteStatus] = useState<string | null>(fact.user_vote);
  const [bookmarkStatus, setBookmarkStatus] = useState<boolean>(
    fact.user_bookmark
  );

  const router = useRouter();

  const upvoteFact = useFactStore((state: any) => state.upvoteFact);
  const downvoteFact = useFactStore((state: any) => state.downvoteFact);
  const bookmarkFact = useFactStore((state: any) => state.bookmarkFact);
  const handleUpvote = async (factId: string) => {
    try {
      await upvoteFact(factId);
      setVoteStatus("upvoted");
    } catch (err) {
      console.error("Failed to upvote fact:", err);
    }
  };

  const handleDownvote = async (factId: string) => {
    try {
      await downvoteFact(factId);
      setVoteStatus("downvoted");
    } catch (err) {
      console.error("Failed to downvote fact:", err);
    }
  };

  const handleUnvote = async (factId: string) => {
    try {
      setVoteStatus(null);
    } catch (err) {
      console.error("Failed to unvote fact:", err);
    }
  };

  const handleToggleBookmark = async (factId: string) => {
    try {
      await bookmarkFact(factId);
      setBookmarkStatus(!bookmarkStatus);
    } catch (err) {
      console.error("Failed to toggle bookmark on fact:", err);
    }
  };
  return (
    <>
      <Card className="w-full h-full">
        <Text className="text-lg font-bold">{fact.title}</Text>
        <Box style={{ flexGrow: 1, flexShrink: 1, height: "80%" }}>
          <Text>{fact.content}</Text>
        </Box>
        <Box className="flex-row justify-between">
          <Box className="flex-row gap-2">
            <Button
              variant="outline"
              size="md"
              onPress={function () {
                if (user) {
                  voteStatus == "upvoted"
                    ? handleUnvote(fact.id)
                    : handleUpvote(fact.id);
                } else {
                  setShowAlertDialog(true);
                }
              }}
            >
              <ButtonIcon
                as={ThumbsUp}
                className={
                  voteStatus == "upvoted" ? " text-blue-500" : "text-black"
                }
              />
            </Button>
            <Button
              variant="outline"
              size="md"
              onPress={() => {
                if (user) {
                  voteStatus == "downvoted"
                    ? handleUnvote(fact.id)
                    : handleDownvote(fact.id);
                } else {
                  setShowAlertDialog(true);
                }
              }}
            >
              <ButtonIcon
                as={ThumbsDown}
                className={
                  voteStatus == "downvoted" ? " text-red-500" : "text-black"
                }
              />
            </Button>
          </Box>

          <Button
            variant="outline"
            onPress={() => {
              if (user) {
                handleToggleBookmark(fact.id);
              } else {
                setShowAlertDialog(true);
              }
            }}
            size="md"
          >
            <ButtonIcon
              as={Bookmark}
              className={
                bookmarkStatus
                  ? "fill-purple-500 text-purple-500"
                  : "text-black"
              }
            />
          </Button>
        </Box>
      </Card>
      <AlertDialog isOpen={showAlertDialog} onClose={handleClose} size="md">
        <AlertDialogBackdrop />
        <AlertDialogContent>
          <AlertDialogHeader>
            <Text className="text-typography-950 font-semibold" size="md">
              Login nødvendig
            </Text>
          </AlertDialogHeader>
          <AlertDialogBody className="mt-3 mb-4">
            <Text size="sm">
              For at kunne stemme eller gemme facts, skal du være logget ind.
            </Text>
          </AlertDialogBody>
          <AlertDialogFooter className="">
            <Button
              variant="outline"
              action="secondary"
              onPress={handleClose}
              size="sm"
            >
              <ButtonText>Annuller</ButtonText>
            </Button>
            <Button
              size="sm"
              onPress={() => {
                router.push("/login");
                handleClose();
              }}
            >
              <ButtonText>Login</ButtonText>
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default FactCard;
